import React from 'react';
import { Link } from 'react-router-dom';
import CommunitySidebar from './CommunitySidebar';
import './Resources.css';

function Resources() {
    const resourceCategories = [
        { name: 'Biodegradables', path: '/biodegradables' },
        { name: 'Non-Biodegradables', path: '/non-biodegradables' },
        { name: 'Recyclables', path: '/recyclables' },
        { name: 'Non-Recyclables', path: '/non-recyclables' },
        { name: 'E-Wastes', path: '/e-wastes' },
        { name: 'Policies', path: '/policies' },
        { name: 'Events', path: '/events' },
    ];

    return (
        <div className="community-page">
            <CommunitySidebar />
            <div className="community-content">
                <h1 className="resources-header">Resources</h1>
                <p className="resources-description">Choose a resource category to explore:</p>
                <div className="resources-grid">
                    {resourceCategories.map((category, index) => (
                        <Link
                            to={category.path}
                            className="resource-item"
                            key={index}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Resources;
