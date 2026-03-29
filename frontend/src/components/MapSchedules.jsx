import React from 'react';
import { Link } from 'react-router-dom';
import CommunitySidebar from './CommunitySidebar';
import './MapSchedules.css';

function MapSchedules() {
    return (
        <div className="community-page">
            <CommunitySidebar />
            <div className="community-content">
                <div className="map-schedules-header">
                    <h1 className="header-title">MAP & SCHEDULES</h1>
                </div>

                {/* Map and Schedules Boxes */}
                <div className="map-schedules-boxes">
                    <Link to="/map-schedules/map" className="map-box">Map</Link>
                    <Link to="/map-schedules/schedules" className="schedules-box">Schedules</Link>
                </div>
            </div>
        </div>
    );
}

export default MapSchedules;
