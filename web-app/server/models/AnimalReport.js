const mongoose = require('mongoose');

const animalReportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    imagePath: { type: String },
    reportedAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual populate for status updates if needed
animalReportSchema.virtual('statusUpdates', {
    ref: 'StatusUpdate',
    localField: '_id',
    foreignField: 'report'
});

module.exports = mongoose.model('AnimalReport', animalReportSchema);
