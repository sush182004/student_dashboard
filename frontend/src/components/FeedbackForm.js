// FeedbackForm component
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function FeedbackForm({ refresh }) {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({ course: '', rating: 5, message: '' });

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await API.get('/courses');
            setCourses(res.data);
        };
        fetchCourses();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.post('/feedback', formData);
            alert('Feedback submitted');
            setFormData({ course: '', rating: 5, message: '' });
            if (refresh) refresh();
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} required>
                <option value="">Select Course</option>
                {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} required />
            <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            <button type="submit">Submit Feedback</button>
        </form>
    );
}

export default FeedbackForm;
