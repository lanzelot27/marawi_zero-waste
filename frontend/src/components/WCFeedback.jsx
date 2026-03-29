import React, { useState } from "react";
import WCSidebar from './WCSidebar';
import './Feedback.css';

const WCFeedback = () => {
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const emojis = [
        { symbol: "😡", color: "#F44336" }, // Unsatisfied (Red)
        { symbol: "😐", color: "#FFEB3B" }, // Neutral (Yellow)
        { symbol: "😄", color: "#4CAF50" }, // Satisfied (Green)
    ];

    const handleEmojiClick = (index) => {
        setSelectedEmoji(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (selectedEmoji === null || !feedbackText.trim()) {
            alert("Please select an emoji and provide your feedback!");
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    emoji: emojis[selectedEmoji].symbol, // Send emoji or index
                    feedbackText,
                }),
            });
    
            if (response.ok) {
                setSuccessMessage("🎉 Thank you for your feedback!");
                setSelectedEmoji(null);
                setFeedbackText("");
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to submit feedback.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again later.');
        }
    };
    

    return (
        <div className="feedback-page">
            <WCSidebar />
            <div className="feedback-container">
                <h2 className="feedback-heading">We Value Your Feedback!</h2>
                <p className="feedback-subheading">Rate your experience</p>
                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="emoji-container">
                        {emojis.map((emoji, index) => (
                            <div
                                key={index}
                                className={`emoji-wrapper ${selectedEmoji === index ? "selected" : ""}`}
                                style={{ backgroundColor: selectedEmoji === index ? emoji.color : "#fff" }}
                                onClick={() => handleEmojiClick(index)}
                                title={`Option ${index + 1}`}
                            >
                                <span className="emoji" style={{ color: emoji.color }}>
                                    {emoji.symbol}
                                </span>
                            </div>
                        ))}
                    </div>

                    <textarea
                        name="feedback"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Write additional comments..."
                        className="feedback-textarea"
                    ></textarea>

                    <button type="submit" className="feedback-button">
                        Submit Feedback
                    </button>
                </form>

                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
};

export default WCFeedback;
