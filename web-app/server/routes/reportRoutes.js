const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: Images Only!"));
    }
});

router.get('/', auth, reportController.getAllReports);
router.get('/:id', auth, reportController.getReportById);
router.post('/', auth, upload.single('image'), reportController.createReport);
router.put('/:id', auth, reportController.updateReport);
router.delete('/:id', auth, reportController.deleteReport);

// Status updates
router.post('/:id/status', auth, reportController.addStatusUpdate);

module.exports = router;
