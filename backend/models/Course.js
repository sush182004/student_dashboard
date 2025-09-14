// Course model
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
