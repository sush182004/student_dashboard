// User routes
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all students
router.get('/', auth, admin, async (req, res) => {
    const users = await User.find({ role: 'student' });
    res.json(users);
});

// Block/Unblock student
router.put('/:id/block', auth, admin, async (req, res) => {
    const { blocked } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { blocked }, { new: true });
    res.json(user);
});

// Delete student
router.delete('/:id', auth, admin, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
});

// Student profile management
router.get('/me', auth, async (req, res) => {
    res.json(req.user);
});

router.put('/me', auth, async (req, res) => {
    const { name, phone, dob, address } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, phone, dob, address }, { new: true });
    res.json(user);
});

router.put('/me/password', auth, async (req, res) => {
    const { current, new: newPass } = req.body;
    const isMatch = await req.user.comparePassword(current);
    if (!isMatch) return res.status(400).json({ msg: 'Current password is incorrect' });

    req.user.password = newPass;
    await req.user.save();
    res.json({ msg: 'Password changed' });
});

module.exports = router;
