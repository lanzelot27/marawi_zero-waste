import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './Admin.css';

function ManageResources() {
    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-accounts-header">
                    <h1>MANAGE RESOURCES</h1>
                    
                </div>

                <div className="resources-boxes">
                    <Link to="/manage-resources/biodegradables" className="resource-box">Biodegradables</Link>
                    <Link to="/manage-resources/non-biodegradables" className="resource-box">Non-Biodegradables</Link>
                    <Link to="/manage-resources/recyclables" className="resource-box">Recyclables</Link>
                    <Link to="/manage-resources/non-recyclables" className="resource-box">Non-Recyclables</Link>
                    <Link to="/manage-resources/ewastes" className="resource-box">E-Wastes</Link>
                    <Link to="/manage-resources/policies" className="resource-box">Policies</Link>
                    <Link to="/manage-resources/events" className="resource-box">Events</Link>

                </div>
            </div>
        </div>
    );
}

export default ManageResources;
