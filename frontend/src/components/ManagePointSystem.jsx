import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './ManagePointSystem.css';

function ManagePointSystem() {
    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-point-system-header">
                    <h1 className="header-title">MANAGE POINT SYSTEM</h1>
                </div>

                {/* Map and Schedules Boxes */}
                <div className="point-system-boxes">
                    <Link to="/manage-proof" className="proof-box">Proof</Link>
                    <Link to="/manage-points" className="points-box">Points</Link>
                </div>
            </div>
        </div>
    );
}

export default ManagePointSystem;
