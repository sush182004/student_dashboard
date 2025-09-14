import React, { useEffect, useState } from 'react';
import API from '../services/api';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import Profile from './Profile';
import '../index.css';

function StudentDashboard() {
    const [user, setUser] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await API.get('/users/me');
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (!user) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h1>Welcome, {user.name}</h1>
            <div className="dashboard-section">
                <Profile user={user} refreshProfile={fetchProfile} />
            </div>
            <div className="dashboard-section">
                <h2>Submit Feedback</h2>
                <FeedbackForm refresh={fetchProfile} />
            </div>
            <div className="dashboard-section">
                <h2>Your Feedbacks</h2>
                <FeedbackList />
            </div>
        </div>
    );
}

export default StudentDashboard;
