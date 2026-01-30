const mongoose = require('mongoose');

const statusUpdateSchema = new mongoose.Schema({
    report: { type: mongoose.Schema.Types.ObjectId, ref: 'AnimalReport', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true },
    comment: { type: String },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StatusUpdate', statusUpdateSchema);
