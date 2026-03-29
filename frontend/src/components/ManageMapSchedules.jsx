import React from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import AdminSidebar from './AdminSidebar';
import './Admin.css';

function ManageMapSchedules() {
    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-map-schedules-header">
                    <h1 className="header-title">MANAGE MAP SCHEDULES</h1>
                    
                </div>

                {/* Map and Schedules Boxes */}
                <div className="map-schedules-boxes">
                    <Link to="/manage-map-schedules/map" className="map-box">Map</Link>
                    <Link to="/manage-map-schedules/schedules" className="schedules-box">Schedules</Link>
                </div>
            </div>
        </div>
    );
}

export default ManageMapSchedules;
