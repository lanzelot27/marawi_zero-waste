import React, { useState, useEffect } from 'react';
import WCSidebar from './WCSidebar';
import './Events.css';
import axios from 'axios';

function WCEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            const eventsWithImages = response.data.map(event => ({
                ...event,
                image: event.image ? `http://localhost:5000/${event.image}` : null, // Add base URL for images if needed
            }));
            setEvents(eventsWithImages);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    return (
        <div className="events-page">
            <WCSidebar />
            <div className="events-content">
                <div className="events-header">
                    <h1>Upcoming Events</h1>
                    <p>Participate in our exciting community events and be a part of the change!</p>
                </div>
                <div className="events-grid">
                    {events.map(event => (
                        <div className="event-card" key={event._id}>
                            {event.image && (
                                <img src={event.image} alt={event.title} className="event-image" />
                            )}
                            <div className="event-details">
                                <h2 className="event-title">{event.title}</h2>
                                <p className="event-description">{event.description}</p>
                                <div className="event-info">
                                    <p className="event-date-time"><strong>Date:</strong> {event.date}</p>
                                    <p className="event-date-time"><strong>Time:</strong> {event.time}</p>
                                    <p className="event-location"><strong>Location:</strong> {event.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WCEvents;
