import React, { useState, useEffect } from 'react';
import CommunitySidebar from './CommunitySidebar';
import './Community.css';
import axios from 'axios';

function NonRecyclables() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/resources/non-recyclables');
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
                <h1>Non-Recyclables</h1>
                    <p className="resources-description">
                        These materials can't be recycled, but disposing of them properly keeps our landfills from overflowing.
                    </p>

                    {/* Video and Side Text Container */}
                    <div className="video-and-text-container">
                        <div className="video-container">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/tAZmzfGHUd8"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="text-container">
                            <div className="side-text">
                                NOT EVERYTHING CAN BE REUSED, BUT IT CAN BE HANDLED RIGHT.
                            </div>
                            <div className="additional-info">
                                While they can't be reused, non-recyclables still need attention to limit their environmental footprint.
                            </div>
                        </div>
                    </div>

                    {/* YouTube Link */}
                    <div className="youtube-link" style={{ marginTop: '10px' }}>
                        <a href="https://www.youtube.com/watch?v=tAZmzfGHUd8" target="_blank" rel="noopener noreferrer">
                            https://www.youtube.com/watch?v=tAZmzfGHUd8
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

export default NonRecyclables;
