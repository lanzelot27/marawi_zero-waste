import React, { useState } from 'react'; // Added useState here
import { Link, useNavigate } from 'react-router-dom';
import './WasteCollector.css';

function WCSidebar() {
    const navigate = useNavigate();

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate("/wastecollector"); // Keeps the admin on the dashboard
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = (e) => {
        e.preventDefault(); // Prevent Link navigation and toggle dropdown
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="wc-sidebar">
            <ul>
                <li>
                    <Link to="/wastecollector" onClick={handleHomeClick}>
                        Home
                    </Link>
                </li>
                <li><Link to="/wc-profile">Profile</Link></li>
                <li><Link to="/wc-dashboard">Manage Dashboard</Link></li>
                <li><Link to="/wc-manage-map-schedules">Manage Map & Schedules</Link></li>

                {/* Dropdown for Resources with a symbol */}
                <li className="dropdown-container">
                    <Link to="#" onClick={toggleDropdown}>
                        Resources
                        <span className="dropdown-symbol">{showDropdown ? '▲' : '▼'}</span> {/* Dropdown symbol */}
                    </Link>
                    {showDropdown && (
                        <ul className="dropdown">
                            <li><Link to="/wc-biodegradables">Biodegradables</Link></li>
                            <li><Link to="/wc-non-biodegradables">Non-Biodegradables</Link></li>
                            <li><Link to="/wc-recyclables">Recyclables</Link></li>
                            <li><Link to="/wc-non-recyclables">Non-Recyclables</Link></li>
                            <li><Link to="/wc-ewastes">E-Wastes</Link></li>
                            <li><Link to="/wc-policies">Policies</Link></li>
                            <li><Link to="/wc-events">Events</Link></li>
                        </ul>
                    )}
                </li>

                
                <li><Link to="/wc-feedback">Feedback</Link></li>
            </ul>
        </div>
    );
}

export default WCSidebar;
