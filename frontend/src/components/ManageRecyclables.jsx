import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './ManageResources.css';
import axios from 'axios';

function ManageRecyclables() {
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null); // Stores resource to update
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newResource, setNewResource] = useState({ name: '', points: '', image: null });

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/resources/recyclables');
            const resourcesWithImages = response.data.map(resource => ({
                ...resource,
                image: resource.image ? `http://localhost:5000/${resource.image}` : null
            }));
            setResources(resourcesWithImages);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResource((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setNewResource((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleAddResource = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newResource.name);
            formData.append('points', newResource.points);
            formData.append('type', 'recyclables');
            if (newResource.image) formData.append('image', newResource.image);

            const response = await axios.post('http://localhost:5000/api/resources', formData);
            setResources([...resources, response.data]);
            setNewResource({ name: '', points: '', image: null });
            setIsAddModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Failed to add resource:', error);
        }
    };

    const handleDeleteResource = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/resources/${id}`);
            setResources(resources.filter((resource) => resource._id !== id));
        } catch (error) {
            console.error('Failed to delete resource:', error);
        }
    };

    const handleEditClick = (resource) => {
        setSelectedResource(resource);
        setNewResource({
            name: resource.name,
            points: resource.points,
            image: null
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateResource = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newResource.name);
            formData.append('points', newResource.points);
            if (newResource.image) formData.append('image', newResource.image);

            await axios.put(`http://localhost:5000/api/resources/${selectedResource._id}`, formData);
            setIsEditModalOpen(false);
            fetchResources(); // Refresh data
        } catch (error) {
            console.error('Failed to update resource:', error);
        }
    };

    return (
        <div className="community-page">
            <AdminSidebar />
            <div className="community-content">
                <div className="resources-header">
                <h1>Recyclables</h1>
                    <p className="resources-description">
                        Taking things we don't need anymore and giving them a new life to keep our planet healthy for generations to come.
                    </p>

                    {/* Video and Side Text Container */}
                    <div className="video-and-text-container">
                        <div className="video-container">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/IsAg-JqJnA8"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="text-container">
                            <div className="side-text">
                                DO YOU RECYCLE? WHY IT COULD BE GOING TO WASTE
                            </div>
                            <div className="additional-info">
                                Recycling reduces landfill waste, conserves resources, and protects the environment by reusing materials to make new products, saving energy and reducing pollution.
                            </div>
                        </div>
                    </div>

                    {/* YouTube Link */}
                    <div className="youtube-link" style={{ marginTop: '10px' }}>
                        <a href="https://www.youtube.com/watch?v=IsAg-JqJnA8" target="_blank" rel="noopener noreferrer">
                        https://www.youtube.com/watch?v=IsAg-JqJnA8
                        </a>
                    </div>

                    <button className="add-resource-btn" onClick={() => setIsAddModalOpen(true)}>
                        + Add Resource
                    </button>
                </div>

                {isAddModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Add New Resource</h2>
                            <input type="text" name="name" placeholder="Resource Name" value={newResource.name} onChange={handleInputChange} />
                            <input type="number" name="points" placeholder="Points" value={newResource.points} onChange={handleInputChange} />
                            <input type="file" onChange={handleImageChange} />
                            <button onClick={handleAddResource}>Add</button>
                            <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                {isEditModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit Resource</h2>
                            <input type="text" name="name" placeholder="Resource Name" value={newResource.name} onChange={handleInputChange} />
                            <input type="number" name="points" placeholder="Points" value={newResource.points} onChange={handleInputChange} />
                            <input type="file" onChange={handleImageChange} />
                            <button onClick={handleUpdateResource}>Update</button>
                            <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                <div className="image-grid">
                    {resources.map((resource) => (
                        <div className="image-item" key={resource._id}>
                            <img src={resource.image || '/placeholder.jpg'} alt={resource.name} />
                            <p>{resource.name}</p>
                            <p className="points">Points: {resource.points}</p>
                            <button onClick={() => handleEditClick(resource)}>Edit</button>
                            <button onClick={() => handleDeleteResource(resource._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageRecyclables;
