import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import "./Admin.css";

// Custom AddMarker Component to handle map clicks
const AddMarker = ({ setTempMarker }) => {
  useMapEvents({
    click: (e) => {
      const newMarker = {
        position: e.latlng,
      };
      setTempMarker(newMarker); // Set temporary marker
    },
  });
  return null;
};

function ManageMap() {
  const [markers, setMarkers] = useState([]); // Markers fetched from the backend
  const [schedules, setSchedules] = useState([]); // Fetched schedules
  const [tempMarker, setTempMarker] = useState(null); // Temporary marker for adding
  const [selectedSchedule, setSelectedSchedule] = useState(null); // Selected schedule for the marker
  const [selectedWasteType, setSelectedWasteType] = useState(null);

  // Fetch all markers from the backend
  const fetchMarkers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/markers");
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  };

  // Fetch schedules for assigning to markers
  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/schedules");
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  // Save a new marker to the backend
  const saveMarker = async () => {
    try {
      if (tempMarker && selectedSchedule) {
        const newMarker = {
          position: tempMarker.position,
          schedule: selectedSchedule._id,
        };
        const response = await axios.post("http://localhost:5000/api/markers", newMarker);
        setMarkers([...markers, response.data]); // Add new marker to the state
        setTempMarker(null); // Clear temp marker
        setSelectedSchedule(null); // Clear selected schedule
        setSelectedWasteType(null);
      }
    } catch (error) {
      console.error("Error saving marker:", error);
    }
  };

  // Delete a marker from the backend
  const handleDeleteMarker = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/markers/${id}`);
      setMarkers(markers.filter((marker) => marker._id !== id));
    } catch (error) {
      console.error("Error deleting marker:", error);
    }
  };

  // Fetch markers and schedules on component load
  useEffect(() => {
    fetchMarkers();
    fetchSchedules();
  }, []);

    // Filter schedules based on selected waste type
    const filteredSchedules = selectedWasteType
    ? schedules.filter((schedule) => schedule.waste === selectedWasteType)
    : [];

  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-content">
        <div className="manage-accounts-header">
          <h1>MANAGE MAP</h1>
        </div>
        <div style={{ marginTop: "20px" }}>
          <MapContainer
            center={[7.997779, 124.261745]} // Adjust initial map position
            zoom={15}
            style={{ height: "600px", width: "100%", border: "1px solid black" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {markers.map((marker) => (
              <Marker key={marker._id} position={marker.position}>
                <Popup>
                  <div>
                    <strong>Location Point:</strong> {marker.schedule.location}
                    <br />
                    <strong>Status:</strong> {marker.schedule.status}
                    <br />
                    <strong>Waste to Collect:</strong> {marker.schedule.waste}
                    <br />
                    <strong>Schedule:</strong> {new Date(marker.schedule.schedule).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
                    <br />
                    <strong>Time:</strong>{" "}
    {new Date(`1970-01-01T${marker.schedule.time}:00`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
                    <br />
                    <strong>Cycle Period:</strong> {marker.schedule.cycle}
                    <br />
                    <button
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px",
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteMarker(marker._id)}
                    >
                      Delete
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            <AddMarker setTempMarker={setTempMarker} />
          </MapContainer>
        </div>
        {tempMarker && (
          <div className="location-selector">
            <h3>
              {selectedWasteType
                ? "Choose a location point to connect to the mark point:"
                : "Choose the waste type to filter locations:"}
            </h3>
            <div className="location-options">
              {!selectedWasteType
                ? ["Biodegradables", "Non-Biodegradables", "Recyclables", "Non-Recyclables", "E-Waste"].map(
                    (wasteType) => (
                      <button
                        key={wasteType}
                        className="location-option"
                        onClick={() => setSelectedWasteType(wasteType)}
                      >
                        {wasteType}
                      </button>
                    )
                  )
                : filteredSchedules.map((schedule) => (
                    <button
                      key={schedule._id}
                      className={`location-option ${
                        selectedSchedule && selectedSchedule._id === schedule._id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSchedule(schedule)}
                    >
                      {schedule.location}
                    </button>
                  ))}
            </div>
            <div className="action-buttons">
              {selectedWasteType && (
                <button onClick={() => setSelectedWasteType(null)} className="back-button">
                  Back
                </button>
              )}
              <button onClick={saveMarker} className="set-button">
                Set
              </button>
              <button onClick={() => setTempMarker(null)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMap;
