import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Community.css';

function CommunitySidebar() {
    const navigate = useNavigate();

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate("/community"); // Keeps the admin on the dashboard
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = (e) => {
        e.preventDefault(); // Prevent Link navigation and toggle dropdown
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="community-sidebar">
            <ul>
                <li>
                    <Link to="/community" onClick={handleHomeClick}>
                        Home
                    </Link>
                </li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/map-schedules">Map & Schedules</Link></li>

                {/* Dropdown for Resources with a symbol */}
                <li className="dropdown-container">
                    <Link to="#" onClick={toggleDropdown}>
                        Resources
                        <span className="dropdown-symbol">{showDropdown ? '▲' : '▼'}</span> {/* Dropdown symbol */}
                    </Link>
                    {showDropdown && (
                        <ul className="dropdown">
                            <li><Link to="/biodegradables">Biodegradables</Link></li>
                            <li><Link to="/non-biodegradables">Non-Biodegradables</Link></li>
                            <li><Link to="/recyclables">Recyclables</Link></li>
                            <li><Link to="/non-recyclables">Non-Recyclables</Link></li>
                            <li><Link to="/e-wastes">E-Wastes</Link></li>
                            <li><Link to="/policies">Policies</Link></li>
                            <li><Link to="/events">Events</Link></li>
                        </ul>
                    )}
                </li>

                <li><Link to="/point-system">Point System</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
            </ul>
        </div>
    );
}

export default CommunitySidebar;
