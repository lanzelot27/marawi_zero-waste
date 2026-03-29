import React, { useState, useEffect } from 'react';
import WCSidebar from './WCSidebar';
import './Community.css';
import axios from 'axios';

function WCBiodegradables() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/resources/biodegradable');
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
            <WCSidebar />
            <div className="community-content">
                <div className="resources-header">
                    <h1>Biodegradables</h1>
                    <p className="resources-description">
                        Turning food scraps and natural waste back into nutrients for the earth, helping plants grow and reducing greenhouse gases.
                    </p>

                    {/* Video and Side Text Container */}
                    <div className="video-and-text-container">
                        <div className="video-container">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/5cFQT7MI3GE"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="text-container">
                            <div className="side-text">
                                COMPOSTING: NATURE'S WAY OF RECYCLING.
                            </div>
                            <div className="additional-info">
                                Biodegradable items return to nature, enriching the soil while keeping our environment healthy.
                            </div>
                        </div>
                    </div>

                    {/* YouTube Link */}
                    <div className="youtube-link" style={{ marginTop: '10px' }}>
                        <a href="https://www.youtube.com/watch?v=5cFQT7MI3GE" target="_blank" rel="noopener noreferrer">
                            https://www.youtube.com/watch?v=5cFQT7MI3GE
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

export default WCBiodegradables;
