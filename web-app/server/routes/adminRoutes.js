const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Middleware to check admin role
const adminCheck = (req, res, next) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Access Denied' });
    next();
};

router.get('/stats', auth, adminCheck, adminController.getStats);
router.get('/users', auth, adminCheck, adminController.getUsers);
router.put('/users/:id/role', auth, adminCheck, adminController.updateUserRole);

module.exports = router;
