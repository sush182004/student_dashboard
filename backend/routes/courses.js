// Courses routes
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Add course
router.post('/', auth, admin, async (req, res) => {
    const { name, description } = req.body;
    const course = new Course({ name, description });
    await course.save();
    res.json(course);
});

// Edit course
router.put('/:id', auth, admin, async (req, res) => {
    const { name, description } = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    res.json(course);
});

// Delete course
router.delete('/:id', auth, admin, async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Course deleted' });
});

// Get all courses
router.get('/', auth, async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

module.exports = router;
