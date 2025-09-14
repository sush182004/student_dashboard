import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h1>Student Feedback System</h1>
            <button onClick={() => navigate('/login/student')}>Student Signup</button>
            <button onClick={() => navigate('/login/admin')}>Admin Login</button>
        </div>
    );
}

export default Home;
