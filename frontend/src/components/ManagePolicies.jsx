import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './ManagePolicies.css';
import axios from 'axios';

function ManagePolicies() {
    const [policies, setPolicies] = useState([]);
    const [newPolicy, setNewPolicy] = useState({ title: '', content: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/policies');
            setPolicies(response.data);
        } catch (error) {
            console.error('Failed to fetch policies:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPolicy((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPolicy = async () => {
        try {
            if (!newPolicy.title || !newPolicy.content) {
                alert('Title and content are required.');
                return;
            }
            const response = await axios.post('http://localhost:5000/api/policies', newPolicy);
            setPolicies((prev) => [...prev, response.data]);
            setNewPolicy({ title: '', content: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to add policy:', error);
        }
    };

    const handleEditPolicy = (policy) => {
        setNewPolicy(policy);
        setIsEditing(true);
        setEditingId(policy._id);
        setIsModalOpen(true);
    };

    const handleUpdatePolicy = async () => {
        try {
            if (!newPolicy.title || !newPolicy.content) {
                alert('Title and content are required.');
                return;
            }
            const response = await axios.put(
                `http://localhost:5000/api/policies/${editingId}`,
                newPolicy
            );
            setPolicies((prev) =>
                prev.map((policy) => (policy._id === editingId ? response.data : policy))
            );
            setNewPolicy({ title: '', content: '' });
            setIsEditing(false);
            setEditingId(null);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to update policy:', error);
        }
    };

    const handleDeletePolicy = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this policy?')) {
                await axios.delete(`http://localhost:5000/api/policies/${id}`);
                setPolicies((prev) => prev.filter((policy) => policy._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete policy:', error);
        }
    };

    return (
        <div className="policies-page">
            <AdminSidebar />
            <div className="policies-content">
                <div className="policies-header">
                    <h1>Waste Management Policies</h1>
                    <p>
                        Our commitment to sustainability is reflected in these carefully
                        crafted policies that aim to promote a cleaner, greener environment
                        for MSU-Marawi.
                    </p>
                </div>

                {/* Add New Policy Button */}
                <div className="add-policy-button-container">
                    <button
                        className="add-policy-btn"
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsEditing(false);
                            setNewPolicy({ title: '', content: '' });
                        }}
                    >
                        Add New Policy
                    </button>
                </div>

                {/* Modal for Adding/Editing Policies */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{isEditing ? 'Edit Policy' : 'Add New Policy'}</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter Policy Title"
                                value={newPolicy.title}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            <textarea
                                name="content"
                                placeholder="Enter Policy Content"
                                value={newPolicy.content}
                                onChange={handleInputChange}
                                className="form-textarea"
                            ></textarea>
                            <div className="modal-buttons">
                                {isEditing ? (
                                    <button className="btn update-btn" onClick={handleUpdatePolicy}>
                                        Update Policy
                                    </button>
                                ) : (
                                    <button className="btn add-btn" onClick={handleAddPolicy}>
                                        Add Policy
                                    </button>
                                )}
                                <button
                                    className="btn cancel-btn"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Policy List */}
                <div className="policies-list">
                    {policies.map((policy) => (
                        <div className="policy-item" key={policy._id}>
                            <h2 className="policy-title">{policy.title}</h2>
                            <p className="policy-content">{policy.content}</p>
                            <div className="policy-buttons">
                                <button
                                    className="btn edit-btn"
                                    onClick={() => handleEditPolicy(policy)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn delete-btn"
                                    onClick={() => handleDeletePolicy(policy._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManagePolicies;
