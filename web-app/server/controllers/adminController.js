const User = require('../models/User');
const AnimalReport = require('../models/AnimalReport');
const StatusUpdate = require('../models/StatusUpdate');

exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalReports = await AnimalReport.countDocuments();

        // To get status counts, we need the latest status for each report.
        // This is complex in Mongo without aggregation framework
        const reports = await AnimalReport.find();
        let pending = 0;
        let resolved = 0;

        for (const report of reports) {
            const latestStatus = await StatusUpdate.findOne({ report: report._id }).sort({ updatedAt: -1 });
            if (latestStatus) {
                if (latestStatus.status === 'Pending') pending++;
                if (latestStatus.status === 'Resolved' || latestStatus.status === 'Rescued') resolved++;
            } else {
                pending++; // Default if no status
            }
        }

        res.json({
            totalUsers,
            totalReports,
            pendingCount: pending,
            resolvedCount: resolved
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.role = role;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
