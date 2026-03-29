import React, { useEffect, useState, useRef } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import './ManageMessage.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function ManageMessage() {
    const [userMessages, setUserMessages] = useState([]); // All user messages grouped by user
    const [activeUser, setActiveUser] = useState(null); // Track selected user's messages
    const [replyText, setReplyText] = useState(''); // Track admin's reply
    const activeUserRef = useRef(null);
    

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/all-community-messages', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserMessages(response.data);
            } catch (error) {
                console.error('Error fetching user messages:', error);
            }
        };
    
        fetchMessages();

    }, []);

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            console.log('New message received:', newMessage);
    
            // Update user list
            setUserMessages((prevUserMessages) =>
                prevUserMessages.map((user) =>
                    user.userIdm === newMessage.communityUserId
                        ? { ...user, latestMessage: newMessage.message, latestTimestamp: newMessage.createdAt }
                        : user
                )
            );
    
            // Update active chat
            if (activeUserRef.current?.comuserId === newMessage.communityUserId) {
                setActiveUser((prev) => ({
                    ...prev,
                    messages: [...prev.messages, newMessage],
                }));
            }
        };
        
        socket.on('update-messages', handleNewMessage);
    
        return () => {
            socket.off('update-messages', handleNewMessage);
        };
    }, [activeUser]); // Add dependency on activeUser to ensure re-render
    
    
    
    const handleReply = async (comuserId) => {
        try {
            const token = localStorage.getItem('token');
            const [communityMessages, adminMessages] = await Promise.all([
                axios.get(`http://localhost:5000/api/auth/community-messages/${comuserId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`http://localhost:5000/api/auth/admin-messages/${comuserId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            // Merge and sort messages by createdAt
            const allMessages = [...communityMessages.data, ...adminMessages.data].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );

            setActiveUser({
                comuserId,
                name: userMessages.find((user) => user.userIdm === comuserId)?.name,
                messages: allMessages,
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    

    const handleSendReply = async () => {
        if (!replyText.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/auth/admin-messages',
                {
                    message: replyText,
                    communityUserId: activeUser.comuserId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            

            setActiveUser((prev) => ({
                ...prev,
                messages: [...prev.messages, response.data],
            }));
            setReplyText('');
        } catch (error) {
            console.error('Error sending reply:', error);
        }
    };

    const handleDelete = async (comuserId) => {
        if (!window.confirm('Are you sure you want to delete all messages for this user?')) {
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
    
            // Call the delete API
            await axios.delete(`http://localhost:5000/api/auth/messages/${comuserId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            // Remove the user from the userMessages list
            setUserMessages((prevUserMessages) =>
                prevUserMessages.filter((user) => user.userIdm !== comuserId)
            );
    
            // If the deleted user is currently active, close the chat
            if (activeUser?.comuserId === comuserId) {
                setActiveUser(null);
                activeUserRef.current = null;
            }
    
            alert('Messages deleted successfully.');
        } catch (error) {
            console.error('Error deleting messages:', error);
            alert('Failed to delete messages.');
        }
    };
    

    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-messages-header">
                    <h1>MANAGE MESSAGES</h1>
                </div>

                {/* User List */}
                {!activeUser && (
                    <div className="messages-container">
                        {userMessages.length > 0 ? (
                            userMessages.map((user) => (
                                <div key={user.userIdm} className="message-card">
                                    <div className="message-header">
                                        <h3>{user.name}</h3> {/* User's name */}
                                        <p>{user.email}</p>
                                    </div>
                                
                                    <div className="message-footer">
                                        <span>{new Date(user.latestTimestamp).toLocaleString()}</span>
                                        <div className="action-buttons">
                                            <button
                                                className="reply-button"
                                                onClick={() => handleReply(user.userIdm)}
                                            >
                                                Reply
                                            </button>
                                            <button
        className="del-button"
        onClick={() => handleDelete(user.userIdm)}
    >
        Delete
    </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-messages">No messages available.</p>
                        )}
                    </div>
                )}

                {/* Chat Interface */}
                {activeUser && (
                    <div className="chat-interface">
                        <div className="chat-header">
                            <h3>Replying to {activeUser.name}</h3>
                            <button className="close-chat" onClick={() => setActiveUser(null)}>
                                ✖
                            </button>
                        </div>
                        <div className="chat-body">
    {activeUser?.messages?.map((msg, index) => (
        <div
            key={index}
            className={`message-bubble ${
                msg.communityUserId ? 'admin-bubble' : 'community-bubble' 
            }`}
        >
            <p>{msg.message}</p>
            <span className="message-date">{new Date(msg.createdAt).toLocaleString()}</span>
        </div>
    ))}
</div>
                        <div className="chat-footer">
                            <textarea
                                placeholder="Type your reply..."
                                className="chat-input"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            ></textarea>
                            <button
                                className="send-button"
                                onClick={handleSendReply}
                                disabled={!replyText.trim()}
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageMessage;
