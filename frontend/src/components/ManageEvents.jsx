import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './ManageEvents.css';
import axios from 'axios';

function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
    });
    const [image, setImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            const eventsWithImages = response.data.map(event => ({
                ...event,
                image: event.image ? `http://localhost:5000/${event.image}` : null, // Prefix with base URL if needed
            }));
            setEvents(eventsWithImages);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddEvent = async () => {
        try {
            const formData = new FormData();
            Object.keys(newEvent).forEach((key) => formData.append(key, newEvent[key]));
            if (image) formData.append('image', image);

            const response = await axios.post('http://localhost:5000/api/events', formData);
            setEvents((prev) => [...prev, response.data]);
            setNewEvent({ title: '', description: '', date: '', time: '', location: '' });
            setImage(null);
            setIsModalOpen(false);

            window.location.reload(); 
        } catch (error) {
            console.error('Failed to add event:', error);
        }
    };

    const handleEditEvent = (event) => {
        setNewEvent(event);
        setImage(null);
        setIsEditing(true);
        setEditingId(event._id);
        setIsModalOpen(true);
    };

    const handleUpdateEvent = async () => {
        try {
            const formData = new FormData();
            Object.keys(newEvent).forEach((key) => formData.append(key, newEvent[key]));
            if (image) formData.append('image', image);

            const response = await axios.put(`http://localhost:5000/api/events/${editingId}`, formData);
            setEvents((prev) =>
                prev.map((event) => (event._id === editingId ? response.data : event))
            );
            setNewEvent({ title: '', description: '', date: '', time: '', location: '' });
            setImage(null);
            setIsEditing(false);
            setEditingId(null);
            setIsModalOpen(false);

            window.location.reload(); 
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this event?')) {
                await axios.delete(`http://localhost:5000/api/events/${id}`);
                setEvents((prev) => prev.filter((event) => event._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    };

    return (
        <div className="eventser-page">
            <AdminSidebar />
            <div className="eventser-content">
                <div className="eventser-header">
    <h1>Manage Events</h1>
    <button className="add-event-btn" onClick={() => setIsModalOpen(true)}>
        + Add New Event
    </button>
</div>


                {/* Modal for Add/Edit Event */}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Event Title"
                                value={newEvent.title}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            <textarea
                                name="description"
                                placeholder="Event Description"
                                value={newEvent.description}
                                onChange={handleInputChange}
                                className="form-input textarea"
                            ></textarea>
                            <input
                                type="text"
                                name="date"
                                placeholder="Event Date (e.g., January 20, 2025)"
                                value={newEvent.date}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            <input
                                type="text"
                                name="time"
                                placeholder="Event Time (e.g., 8:00 AM - 12:00 PM)"
                                value={newEvent.time}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Event Location"
                                value={newEvent.location}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="form-input"
                            />
                            <div className="modal-buttons">
                                <button
                                    className="btn-primary"
                                    onClick={isEditing ? handleUpdateEvent : handleAddEvent}
                                >
                                    {isEditing ? 'Update Event' : 'Add Event'}
                                </button>
                                <button
                    className="btn-secondary"
                    onClick={() => {
                        setIsModalOpen(false); // Close the modal
                        window.location.reload(); // Refresh the page
                    }}
                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Event List */}
                <div className="events-grid">
                    {events.map((event) => (
                        <div className="event-card" key={event._id}>
                            <img
                                src={event.image}
                                alt={event.title}
                                className="event-image"
                            />
                            <div className="event-details">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p>
                                    <strong>Date:</strong> {event.date}
                                </p>
                                <p>
                                    <strong>Time:</strong> {event.time}
                                </p>
                                <p>
                                    <strong>Location:</strong> {event.location}
                                </p>
                                <div className="event-actions">
                                    <button
                                        className="btn-secondary"
                                        onClick={() => handleEditEvent(event)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDeleteEvent(event._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageEvents;
