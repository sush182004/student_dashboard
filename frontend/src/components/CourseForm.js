import React, { useState } from 'react';
import API from '../services/api';
import '../index.css';

function CourseForm({ refresh, courses }) {
    const [formData, setFormData] = useState({ name: '', description: '' });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.post('/courses', formData);
            alert('Course added');
            setFormData({ name: '', description: '' });
            refresh();
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const handleDelete = async id => {
        if (!window.confirm('Delete this course?')) return;
        try {
            await API.delete(`/courses/${id}`);
            alert('Course deleted');
            refresh();
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div>
            <h3>Manage Courses</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="Course Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                <input placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <button type="submit">Add Course</button>
            </form>

            <h4>Existing Courses</h4>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        {course.name} - {course.description}
                        <button onClick={() => handleDelete(course._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseForm;
