import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WasteCollector.css'; 
import WCSidebar from './WCSidebar';  

function WCDashboard() { 
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="wc-dashboard">
        <WCSidebar />  
        <div className="dashboard-content">
            <div className="dashboard-header">
                <h1>BOLOS KANO, Collectors!</h1>
                <h2>Welcome to MARAWI Zero-Waste!</h2>
            </div>
            <div className="dashboard-grid">
                <Link to="/wc-profile" className="dashboard-item">
                    <div className="icon-background">
                        <img src="/src/assets/profile.png" alt="Profile" />
                    </div>
                    <span>Profile</span>
                </Link>
                <Link to="/wc-dashboard" className="dashboard-item">
                    <div className="icon-background">
                        <img src="/src/assets/dashboard.png" alt="Dashboard" />
                    </div>
                    <span>Manage Dashboard</span>
                </Link>
                <Link to="/wc-manage-map-schedules" className="dashboard-item">
                    <div className="icon-background">
                        <img src="/src/assets/map.png" alt="Map & Schedules" />
                    </div>
                    <span>Manage Map & Schedules</span>
                </Link>
                <Link to="/wc-resources" className="dashboard-item">
                    <div className="icon-background">
                        <img src="/src/assets/resources.png" alt="Resources" />
                    </div>
                    <span>Resources</span>
                </Link>
                <Link to="/wc-feedback" className="dashboard-item">
                    <div className="icon-background">
                        <img src="/src/assets/feedback.png" alt="Feedback" />
                    </div>
                    <span>Feedback</span>
                </Link>
            </div>
        </div>

        
        {/* Floating Chat Box */}
        {isChatVisible && (
            <div className="floating-chat-box">
                <div className="chat-header">
                    <div className="header-title">
                        <img src="/src/assets/logo.png" alt="MARAWASTE Logo" className="chat-logo" />
                        <h3>MARAWASTE</h3>
                    </div>
                    <button onClick={toggleChat} className="close-chat">✖</button>
                </div>
                <div className="chat-body">
                    <div className="fixed-message">
                        <p>Hello! How can I assist you today?</p>
                    </div>
                </div>
                <div className="chat-footer">
                    <textarea
                        placeholder="Write a message..."
                        className="chat-input"
                        value={inputValue}
                        onChange={handleInputChange}
                    ></textarea>
                    <button
                        className="send-button"
                        disabled={!inputValue.trim()} // Button is disabled if the input is empty
                    >
                        ➤
                    </button>
                </div>
            </div>
        )}
    </div>
  );
}

export default WCDashboard;
