import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Community.css'; 
import CommunitySidebar from './CommunitySidebar';  
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); 

function CommunityDashboard() {
  const navigate = useNavigate();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  // Initialize Socket.IO
  useEffect(() => {
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://localhost:5000/api/auth/messages/community',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    fetchMessages();

    // Listen for new messages via Socket.IO
    socket.on('update-messages', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
        socket.off('update-messages');
    };
}, []);



  
const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/auth/community-messages',
                { message: inputValue },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setInputValue('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


  return (
    <div className="community-dashboard">
      <CommunitySidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>BOLOS KANO!</h1>
          <h2>Welcome to MARAWI Zero-Waste!</h2>
        </div>
        <div className="dashboard-grid">
          <Link to="/profile" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/profile.png" alt="Profile" />
            </div>
            <span>Profile</span>
          </Link>
          <Link to="/map-schedules" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/map.png" alt="Map & Schedules" />
            </div>
            <span>Map & Schedules</span>
          </Link>
          <Link to="/resources" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/resources.png" alt="Resources" />
            </div>
            <span>Resources</span>
          </Link>
          <Link to="/point-system" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/point-system.png" alt="Point System" />
            </div>
            <span>Point System</span>
          </Link>
          <Link to="/feedback" className="dashboard-item">
            <div className="icon-background">
              <img src="/src/assets/feedback.png" alt="Feedback" />
            </div>
            <span>Feedback</span>
          </Link>
        </div>
      </div>
      {/* Messages Icon */}

      <div className="messages-icon"  onClick={() => setIsChatVisible(!isChatVisible)}>

        <img src="/src/assets/messages.png" alt="Messages" />

      </div>



      {/* Floating Chat Box */}

      {isChatVisible && (

        <div className="floating-chat-box">

          <div className="chat-header">

            <div className="header-title">

              <img src="/src/assets/logo.png" alt="MARAWASTE Logo" className="chat-logo" />

              <h3>MARAWASTE</h3>

            </div>

            <button onClick={() => setIsChatVisible(false)}>✖</button>

          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-bubble ${
                  msg.comuserId ? 'admin-bubble' : 'community-bubble'
              }`}
          >
                <p>{msg.message}</p>
                <span className="message-date">{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>


          <div className="chat-footer">

            <textarea

              placeholder="Write a message..."

              className="chat-input"

              value={inputValue}

              onChange={(e) => setInputValue(e.target.value)}

            ></textarea>

<button onClick={handleSendMessage}>    ➤</button>

          </div>



        </div>

      )}

    </div>

  );

}



export default CommunityDashboard;


