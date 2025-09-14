// Feedback model
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: String
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
