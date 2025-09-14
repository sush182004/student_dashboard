import React, { useEffect, useState } from 'react';
import API from '../services/api';
import AnalyticsChart from '../components/AnalyticsChart';
import CourseForm from '../components/CourseForm';
import StudentManagement from '../components/StudentManagement';
import '../index.css';

function AdminDashboard() {
    const [stats, setStats] = useState({ totalStudents: 0, totalFeedbacks: 0 });
    const [courses, setCourses] = useState([]);

    const fetchStats = async () => {
        try {
            const feedbackRes = await API.get('/feedback');
            const studentRes = await API.get('/users');
            const courseRes = await API.get('/courses');
            setStats({ totalStudents: studentRes.data.length, totalFeedbacks: feedbackRes.data.length });
            setCourses(courseRes.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-section">
                <h3>Total Students: {stats.totalStudents}</h3>
                <h3>Total Feedbacks: {stats.totalFeedbacks}</h3>
            </div>
            <div className="dashboard-section">
                <h2>Feedback Analytics</h2>
                <AnalyticsChart />
            </div>
            <div className="dashboard-section">
                <CourseForm refresh={fetchStats} courses={courses} />
            </div>
            <div className="dashboard-section">
                <StudentManagement />
            </div>
        </div>
    );
}

export default AdminDashboard;
