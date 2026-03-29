import React, { useState, useEffect } from 'react';
import CommunitySidebar from './CommunitySidebar';
import './Community.css';
import axios from 'axios';

function Recyclables() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/resources/recyclables');
            const resourcesWithImages = response.data.map(resource => ({
                ...resource,
                image: resource.image ? `http://localhost:5000/${resource.image}` : null // Prefix image path
            }));
            setResources(resourcesWithImages);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        }
    };

    return (
        <div className="community-page">
            <CommunitySidebar />
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

                    {/* Image Grid */}
                    <div className="image-grid">
                        {resources.map((resource) => (
                            <div className="image-item" key={resource._id}>
                                <img src={resource.image || '/placeholder.jpg'} alt={resource.name} />
                            <p>{resource.name}</p>
                            <p className="points">Points: {resource.points}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recyclables;
