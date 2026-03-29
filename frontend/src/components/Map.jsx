import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CommunitySidebar from "./CommunitySidebar";
import axios from "axios";
import "./Community.css";

function CommunityMap() {
  const [markers, setMarkers] = useState([]); // Markers fetched from the backend

  // Fetch all markers from the backend
  const fetchMarkers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/markers");
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  };

  // Fetch markers on component load
  useEffect(() => {
    fetchMarkers();
  }, []);

  return (
    <div className="community-page">
      <CommunitySidebar />
      <div className="community-content">
        <div className="header">
          <h1>MAP</h1>
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
                    <strong>Schedule:</strong>{" "}
                    {new Date(marker.schedule.schedule).toLocaleDateString(undefined, {
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
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default CommunityMap;
