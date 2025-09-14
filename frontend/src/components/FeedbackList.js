// FeedbackList component
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = async () => {
        const res = await API.get('/feedback/my');
        setFeedbacks(res.data);
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <div>
            {feedbacks.map(f => (
                <div key={f._id}>
                    <h4>{f.course.name}</h4>
                    <p>Rating: {f.rating}</p>
                    <p>{f.message}</p>
                </div>
            ))}
        </div>
    );
}

export default FeedbackList;
