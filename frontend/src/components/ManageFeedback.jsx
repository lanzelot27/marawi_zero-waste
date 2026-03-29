import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import './ManageFeedback.css';
import axios from 'axios';

function ManageFeedback() {
    const [feedbackList, setFeedbackList] = useState([]);

    // Fetch feedback from the backend
    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/feedback', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Sort feedback by most recent
                const sortedFeedback = response.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setFeedbackList(sortedFeedback);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };
        fetchFeedback();
    }, []);

    // Handle delete feedback
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/auth/feedback/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Feedback deleted successfully!');
                setFeedbackList(feedbackList.filter((feedback) => feedback._id !== id));
            } catch (error) {
                console.error('Error deleting feedback:', error);
                alert('Failed to delete feedback. Please try again later.');
            }
        }
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-accounts-header">
                    <h1>MANAGE FEEDBACK</h1>
                </div>
                <div className="feedback-table">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Emoji</th>
                                <th>Feedback</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackList.map((feedback, index) => (
                                <tr key={feedback._id}>
                                    <td>{index + 1}</td> {/* Numbering users */}
                                    <td>{feedback.emoji}</td>
                                    <td>{feedback.feedbackText}</td>
                                    <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="action-btn del-btn"
                                            onClick={() => handleDelete(feedback._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageFeedback;
