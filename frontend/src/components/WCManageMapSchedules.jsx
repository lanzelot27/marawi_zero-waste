import React from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import WCSidebar from './WCSidebar';
import './WasteCollector.css';

function WCManageMapSchedules() {
    return (
        <div className="wastecollector-page">
            <WCSidebar />
            <div className="wastecollector-content">
                <div className="wc-manage-map-schedules-header">
                    <h1 className="header-title">MANAGE MAP SCHEDULES</h1>
                </div>

                {/* Map and Schedules Boxes */}
                <div className="map-schedules-boxes">
                    <Link to="/wc-manage-map-schedules/wc-map" className="map-box">Map</Link>
                    <Link to="/wc-manage-map-schedules/schedules" className="schedules-box">Schedules</Link>
                </div>
            </div>
        </div>
    );
}

export default WCManageMapSchedules;
