import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import '../index.css';

function Login() {
    const { role } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            if (res.data.role === 'admin') navigate('/admin');
            else navigate('/student');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="container">
            <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
