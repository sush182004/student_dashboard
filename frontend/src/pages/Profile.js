import React, { useState } from 'react';
import API from '../services/api';
import '../index.css';

function Profile({ user, refreshProfile }) {
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone || '',
        dob: user.dob ? user.dob.slice(0,10) : '',
        address: user.address || ''
    });

    const [passwords, setPasswords] = useState({ current: '', new: '' });

    const handleUpdate = async e => {
        e.preventDefault();
        try {
            await API.put('/users/me', formData);
            alert('Profile updated');
            refreshProfile();
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const handlePasswordChange = async e => {
        e.preventDefault();
        try {
            await API.put('/users/me/password', passwords);
            alert('Password changed');
            setPasswords({ current: '', new: '' });
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div>
            <h3>Profile</h3>
            <form onSubmit={handleUpdate}>
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input value={user.email} readOnly />
                <input value={formData.phone} placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} />
                <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                <input placeholder="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                <button type="submit">Update Profile</button>
            </form>

            <h3>Change Password</h3>
            <form onSubmit={handlePasswordChange}>
                <input type="password" placeholder="Current Password" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} required />
                <input type="password" placeholder="New Password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} required />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default Profile;
