// Feedback routes
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Student submits feedback
router.post('/', auth, async (req, res) => {
    const { course, rating, message } = req.body;
    const feedback = new Feedback({ student: req.user._id, course, rating, message });
    await feedback.save();
    res.json(feedback);
});

// Student views own feedback
router.get('/my', auth, async (req, res) => {
    const feedbacks = await Feedback.find({ student: req.user._id }).populate('course');
    res.json(feedbacks);
});

// Admin views all feedback
router.get('/', auth, admin, async (req, res) => {
    const { course, rating, student } = req.query;
    let filter = {};
    if (course) filter.course = course;
    if (rating) filter.rating = rating;
    if (student) filter.student = student;

    const feedbacks = await Feedback.find(filter).populate('student course');
    res.json(feedbacks);
});

module.exports = router;
