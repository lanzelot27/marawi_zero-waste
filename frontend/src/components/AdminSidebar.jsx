import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminSidebar() {
    const navigate = useNavigate();

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate("/admin"); // Keeps the admin on the dashboard
    };

    return (
        <div className="admin-sidebar">
            <ul>
                <li>
                    <Link to="/admin" onClick={handleHomeClick}>
                        Home
                    </Link>
                </li>
                <li><Link to="/manage-accounts">Manage Accounts</Link></li>
                <li><Link to="/manage-dashboard">Manage Dashboard</Link></li>
                <li><Link to="/manage-map-schedules">Manage Map & Schedules</Link></li>
                <li><Link to="/manage-resources">Manage Resources</Link></li>
                <li><Link to="/manage-point-system">Manage Point System</Link></li>
                <li><Link to="/manage-message">Manage Message</Link></li>
                <li><Link to="/manage-feedback">Manage Feedback</Link></li>
            </ul>
        </div>
    );
}

export default AdminSidebar;
