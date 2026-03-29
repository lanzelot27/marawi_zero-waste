import React, { useState, useEffect } from 'react';
import CommunitySidebar from './CommunitySidebar';
import './Schedules.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

function Schedules() {
    const [schedules, setSchedules] = useState([]); // State for fetched schedules
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All'); // State to track selected filter
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch schedules from backend
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/schedules'); // Backend endpoint
                setSchedules(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching schedules:", err);
                setError("Failed to fetch schedules.");
                setLoading(false);
            }
        };

        fetchSchedules();
    }, []);

   // Filter schedules based on search term and waste type
const filteredSchedules = schedules.filter((item) => {
    const matchesSearch = item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.waste.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
});

// Utility to find majority waste per day
const getMajorWasteMap = (schedules) => {
    const wasteMap = {};
  
    schedules.forEach((item) => {
      const dateKey = new Date(item.schedule).toISOString().split("T")[0];
  
      if (!wasteMap[dateKey]) wasteMap[dateKey] = {};
  
      if (!wasteMap[dateKey][item.waste]) {
        wasteMap[dateKey][item.waste] = 1;
      } else {
        wasteMap[dateKey][item.waste]++;
      }
    });
  
    // Transform to get the majority waste for each date
    const majorityWaste = {};
    Object.entries(wasteMap).forEach(([date, wasteCounts]) => {
      const maxWaste = Object.entries(wasteCounts).sort((a, b) => b[1] - a[1])[0][0];
      majorityWaste[date] = maxWaste;
    });
  
    return majorityWaste;
  };

  const majorityWasteMap = getMajorWasteMap(filteredSchedules);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

    return (
        <div className="community-page">
            <CommunitySidebar />
            <div className="community-content">
                <div className="header">
                    <h1>SCHEDULES</h1>
                </div>

                {/* Search Bar */}
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="filter-buttons-container">
                    {['All', 'Biodegradables', 'Non-Biodegradables', 'Recyclables', 'Non-Recyclables', 'E-Waste'].map((type, index) => (
                        <button
                            key={index}
                            className={`filter-button ${filter === type ? 'active' : ''}`}
                            onClick={() => setFilter(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>


                {/* Display loading or error messages */}
                {loading && <p>Loading schedules...</p>}
                {error && <p className="error-message">{error}</p>}

                {/* Calendar Display */}
<div className="calendar-container">
    <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={filteredSchedules.map((item) => ({
            title: `${item.location}`,
            start: new Date(
                `${new Date(item.schedule).toISOString().split("T")[0]}T${item.time}:00`
              ),              
            extendedProps: {
                location: item.location,
                status: item.status,
                time: item.time,
                cycle: item.cycle,
                waste: item.waste,
            },
        }))}
        eventClick={handleEventClick}
         displayEventTime={false}
        height="auto"
        dayCellContent={(arg) => {
  // Offset forward by one day for alignment workaround
  const adjustedDate = new Date(arg.date);
  adjustedDate.setDate(adjustedDate.getDate() + 1);

  const dateStr = adjustedDate.toISOString().split("T")[0];
  const waste = majorityWasteMap[dateStr];

  return (
    <div style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'left', paddingLeft: '4px' }}>
      {waste ? `${waste} ${arg.dayNumberText}` : arg.dayNumberText}
    </div>
  );
}}

    />
    {showModal && selectedEvent && (
  <div className="custom-modal-overlay">
    <div className="custom-modal">
      <h3>📍 {selectedEvent.location}</h3>
      <p><strong>🗑️ Waste:</strong> {selectedEvent.waste}</p>
      <p><strong>📅 Status:</strong> {selectedEvent.status}</p>
      <p><strong>🕑 Time:</strong> {new Date(`1970-01-01T${selectedEvent.time}:00`).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}</p>
      <p><strong>♻️ Cycle:</strong> {selectedEvent.cycle}</p>
      <button className="close-btn" onClick={closeModal}>Close</button>
    </div>
  </div>
)}

</div>

            </div>
        </div>
    );
}

export default Schedules;
