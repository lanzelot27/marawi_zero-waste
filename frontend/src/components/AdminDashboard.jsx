import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';
import AdminSidebar from './AdminSidebar';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>HELLO ADMIN!</h1>
          <h2>Welcome to MARAWI Zero-Waste!</h2>
        </div>
        <div className="dashboard-grid">
          <Link to="/manage-accounts" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/profile.png" alt="Manage Accounts" />
            </div>
            <span>Manage Accounts</span>
          </Link>
          <Link to="/manage-dashboard" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/dashboard.png" alt="Manage Dashboard" />
            </div>
            <span>Manage Dashboard</span>
          </Link>
          <Link to="/manage-map-schedules" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/map.png" alt="Manage Map & Schedules" />
            </div>
            <span>Manage Map & Schedules</span>
          </Link>
          <Link to="/manage-resources" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/resources.png" alt="Manage Resources" />
            </div>
            <span>Manage Resources</span>
          </Link>
          <Link to="/manage-point-system" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/point-system.png" alt="Manage Point System" />
            </div>
            <span>Manage Point System</span>
          </Link>
          <Link to="/manage-message" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/message.png" alt="Manage Message" />
            </div>
            <span>Manage Message</span>
          </Link>
          <Link to="/manage-feedback" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/feedback.png" alt="Manage Feedback" />
            </div>
            <span>Manage Feedback</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
