import React from 'react';
import { Link } from 'react-router-dom';
import WCSidebar from './WCSidebar';
import './WCResources.css';

function WCResources() {
    const resourceCategories = [
        { name: 'Biodegradables', path: '/wc-biodegradables' },
        { name: 'Non-Biodegradables', path: '/wc-non-biodegradables' },
        { name: 'Recyclables', path: '/wc-recyclables' },
        { name: 'Non-Recyclables', path: '/wc-non-recyclables' },
        { name: 'E-Wastes', path: '/wc-ewastes' },
        { name: 'Policies', path: '/wc-policies' },
        { name: 'Events', path: '/wc-events' },
    ];

    return (
        <div className="wastecollector-page">
            <WCSidebar />
            <div className="wastecollector-content">
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

export default WCResources;
