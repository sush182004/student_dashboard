import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../index.css';

function StudentManagement() {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const res = await API.get('/users');
            setStudents(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const toggleBlock = async (id, blocked) => {
        try {
            await API.put(`/users/${id}/block`, { blocked: !blocked });
            fetchStudents();
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const handleDelete = async id => {
        if (!window.confirm('Delete this student?')) return;
        try {
            await API.delete(`/users/${id}`);
            fetchStudents();
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div>
            <h3>Student Management</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Blocked</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s._id}>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.blocked ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => toggleBlock(s._id, s.blocked)}>
                                    {s.blocked ? 'Unblock' : 'Block'}
                                </button>
                                <button onClick={() => handleDelete(s._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentManagement;
