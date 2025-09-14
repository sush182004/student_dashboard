// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Course = require('./models/Course');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});

    // Create admin
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      blocked: false
    });

    // Create student
    const studentPassword = await bcrypt.hash('Student@123', 10);
    const student = new User({
      name: 'Student User',
      email: 'student@example.com',
      password: studentPassword,
      role: 'student',
      blocked: false
    });

    await admin.save();
    await student.save();

    // Create sample courses
    const courses = [
      { name: 'Mathematics', description: 'Basic Math Course' },
      { name: 'Physics', description: 'Physics Fundamentals' },
      { name: 'Computer Science', description: 'Intro to CS' }
    ];

    await Course.insertMany(courses);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
