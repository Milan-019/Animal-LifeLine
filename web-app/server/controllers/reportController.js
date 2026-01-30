const AnimalReport = require('../models/AnimalReport');
const StatusUpdate = require('../models/StatusUpdate');
const User = require('../models/User');

// Helper to simulate email
const sendEmail = (to, subject, body) => {
    console.log(`[EMAIL] To: ${to}, Subject: ${subject}`);
    // In production use nodemailer
};

exports.getAllReports = async (req, res) => {
    try {
        const userRole = req.user.role;
        const userId = req.user.id;

        let reports;
        if (userRole === 'Admin' || userRole === 'Volunteer') {
            reports = await AnimalReport.find().populate('user', 'name').populate({ path: 'statusUpdates', populate: { path: 'user', select: 'name' } });
        } else {
            reports = await AnimalReport.find({ user: userId }).populate('user', 'name').populate({ path: 'statusUpdates', populate: { path: 'user', select: 'name' } });
        }

        // We need to fetch status updates manually if using virtuals or just query them
        // Since I defined virtual 'statusUpdates', I used .populate('statusUpdates') which requires the virtual to be set up correctly in Model + .lean()/.exec or careful toObject handling.
        // Easier approach: Query reports, then for each query status updates? Or just rely on virtual populate.

        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await AnimalReport.findById(req.params.id)
            .populate('user', 'name')
            .populate({
                path: 'statusUpdates',
                options: { sort: { updatedAt: 1 } },
                populate: { path: 'user', select: 'name' }
            });

        if (!report) return res.status(404).json({ message: 'Report not found' });
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createReport = async (req, res) => {
    try {
        // req.file is from multer
        const { title, description, location, latitude, longitude } = req.body;

        let imagePath = '';
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const newReport = new AnimalReport({
            title,
            description,
            location,
            latitude,
            longitude,
            imagePath,
            user: req.user.id
        });

        const savedReport = await newReport.save();

        // Create initial status
        const initialStatus = new StatusUpdate({
            report: savedReport._id,
            user: req.user.id,
            status: 'Pending',
            comment: 'Report submitted'
        });
        await initialStatus.save();

        // Send email to admin
        sendEmail('animallifeline0@gmail.com', 'New Animal Report', `New report: ${title}, ID: ${savedReport._id}`);

        res.status(201).json(savedReport);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateReport = async (req, res) => {
    try {
        // Only allow updating basics? Or adding status updates?
        // The C# "Edit" allows editing fields.
        const { title, description, location, latitude, longitude } = req.body;

        // Check ownership or admin
        const report = await AnimalReport.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });

        if (req.user.role !== 'Admin' && report.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        report.title = title || report.title;
        report.description = description || report.description;
        report.location = location || report.location;
        if (latitude) report.latitude = latitude;
        if (longitude) report.longitude = longitude;

        await report.save();
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const report = await AnimalReport.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });

        if (req.user.role !== 'Admin' && report.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await AnimalReport.findByIdAndDelete(req.params.id);
        // Should also delete status updates
        await StatusUpdate.deleteMany({ report: req.params.id });

        res.json({ message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addStatusUpdate = async (req, res) => {
    try {
        const { status, comment } = req.body;
        const reportId = req.params.id;

        const newStatus = new StatusUpdate({
            report: reportId,
            user: req.user.id,
            status,
            comment
        });

        await newStatus.save();
        res.status(201).json(newStatus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
