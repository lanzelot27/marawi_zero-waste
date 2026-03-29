import React, { useState, useEffect } from "react";
import WCSidebar from "./WCSidebar";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./ManageDashboard.css";
import axios from "axios";

function WCDash() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [wasteData, setWasteData] = useState({
    biodegradables: 0,
    nonBiodegradables: 0,
    recyclables: 0,
    nonRecyclables: 0,
    eWaste: 0,
  });
  const [collectorData, setCollectorData] = useState({ activeCollectors: 0 });
  const [truckData, setTruckData] = useState({ availableTrucks: 0, tripsMade: 0 });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCollectorOrTruckModalOpen, setIsCollectorOrTruckModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Tracks the current modal type
  const [modalData, setModalData] = useState({}); // Stores data for updating
  const [yearlyWasteData, setYearlyWasteData] = useState([]);



  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const fetchWasteData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/waste-stats?month=${month + 1}&year=${year}`
      );
      setWasteData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If the server responds with 404, set default data to zeros
        setWasteData({
          biodegradables: 0,
          nonBiodegradables: 0,
          recyclables: 0,
          nonRecyclables: 0,
          eWaste: 0,
        });
      } else {
        console.error("Error fetching waste data:", error);
      }
    }
  };

  const fetchYearlyWasteData = async () => {
    try {
      const monthlyData = await Promise.all(
        months.map(async (_, monthIndex) => {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/waste-stats?month=${monthIndex + 1}&year=${year}`
            );
            return response.data; // Return actual data if the API call succeeds
          } catch (error) {
            if (error.response && error.response.status === 404) {
              // Default to zeros if no data is found for the month
              return {
                biodegradables: 0,
                nonBiodegradables: 0,
                recyclables: 0,
                nonRecyclables: 0,
                eWaste: 0,
              };
            }
            throw error; // Rethrow error if it's not a 404
          }
        })
      );
      setYearlyWasteData(monthlyData);
    } catch (error) {
      console.error("Error fetching yearly waste data:", error);
      setYearlyWasteData([]); // Set to empty array on error
    }
  };
  
  

  const fetchCollectorData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/collectors");
      setCollectorData(response.data);
    } catch (error) {
      console.error("Error fetching collector data:", error);
    }
  };

  const fetchTruckData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/trucks");
      setTruckData(response.data);
    } catch (error) {
      console.error("Error fetching truck data:", error);
    }
  };

  const calculatePercentages = () => {
    const total =
      wasteData.biodegradables +
      wasteData.nonBiodegradables +
      wasteData.recyclables +
      wasteData.nonRecyclables +
      wasteData.eWaste;

    return {
      labels: ["Biodegradables", "Non-Biodegradables", "Recyclables", "Non-Recyclables", "E-Waste"],
      datasets: [
        {
          data: [
            (wasteData.biodegradables / total) * 100,
            (wasteData.nonBiodegradables / total) * 100,
            (wasteData.recyclables / total) * 100,
            (wasteData.nonRecyclables / total) * 100,
            (wasteData.eWaste / total) * 100,
          ],
          backgroundColor: ["#015a00", "#b8ff96", "#35a722", "#a7df8f", "#1ca445"],
        },
      ],
    };
  };
  const handleCollectorOrTruckUpdate = (type, data) => {
    setModalType(type);
    setModalData(data);
    setIsCollectorOrTruckModalOpen(true);
  };

  const handleCollectorOrTruckSubmit = async () => {
    try {
      if (modalType === "Waste Collector") {
        await axios.put("http://localhost:5000/api/collectors", modalData);
        fetchCollectorData();
      } else if (modalType === "Truck") {
        await axios.put("http://localhost:5000/api/trucks", modalData);
        fetchTruckData();
      }
      alert(`${modalType} updated successfully.`);
      setIsCollectorOrTruckModalOpen(false);
    } catch (error) {
      console.error(`Error updating ${modalType}:`, error);
    }
  };

  useEffect(() => {
    fetchWasteData();
    fetchCollectorData();
    fetchTruckData();
    fetchYearlyWasteData();
  }, [month, year]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include month and year in the payload along with wasteData
      await axios.put("http://localhost:5000/api/waste-stats", {
        month: month + 1, // Add 1 because months are zero-indexed
        year: year,
        ...wasteData, // Spread only the waste-related fields
      });
      alert("Waste data updated successfully.");
      setIsUpdateModalOpen(false);
      fetchWasteData(); // Refresh data
    } catch (error) {
      console.error("Error updating waste data:", error);
    }
  };

  useEffect(() => {
    fetchWasteData();
    fetchCollectorData();
    fetchTruckData();
  }, [month, year]);

  return (
    <div className="dashboard-wrapper">
      <WCSidebar />
      <div className="dashboard-content">
        <h1 className="dashboard-title">MANAGE DASHBOARD</h1>
        <div className="stats">
  <div className="date-selector">
    <div className="month-selector">
      <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
        {months.map((m, index) => (
          <option key={index} value={index}>
            {m}
          </option>
        ))}
      </select>
    </div>
    <div className="year-selector">
      <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i} value={currentDate.getFullYear() - i}>
            {currentDate.getFullYear() - i}
          </option>
        ))}
      </select>
    </div>
  </div>
  <div className="waste-stats">
    <div className="stat-box">
      <h3>{wasteData.biodegradables}</h3>
      <p>Biodegradables</p>
    </div>
    <div className="stat-box">
      <h3>{wasteData.nonBiodegradables}</h3>
      <p>Non-Biodegradables</p>
    </div>
    <div className="stat-box">
      <h3>{wasteData.recyclables}</h3>
      <p>Recyclables</p>
    </div>
    <div className="stat-box">
      <h3>{wasteData.nonRecyclables}</h3>
      <p>Non-Recyclables</p>
    </div>
    <div className="stat-box">
      <h3>{wasteData.eWaste}</h3>
      <p>E-Wastes</p>
    </div>
  </div>
  <div className="updatestats-btn">
    <button onClick={() => setIsUpdateModalOpen(true)}>Update Stats</button>
  </div>
</div>



        <div className="charts-container">
        <div className="infos-boxes">
          <div className="infos-box">
            <h3>Waste Collector</h3>
            <p>Active Collectors: {collectorData.activeCollectors}</p>
            <button
              onClick={() =>
                handleCollectorOrTruckUpdate("Waste Collector", {
                  activeCollectors: collectorData.activeCollectors,
                })
              }
            >
              Update
            </button>
          </div>

          <div className="infos-box">
            <h3>Truck</h3>
            <p>Available Trucks: {truckData.availableTrucks}</p>
            <p>Trips Made: {truckData.tripsMade}</p>
            <button
              onClick={() =>
                handleCollectorOrTruckUpdate("Truck", {
                  availableTrucks: truckData.availableTrucks,
                  tripsMade: truckData.tripsMade,
                })
              }
            >
              Update
            </button>
          </div>
        </div>

        {isCollectorOrTruckModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h3>Update {modalType}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCollectorOrTruckSubmit();
        }}
      >
        {Object.keys(modalData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
            <input
              type="number"
              value={modalData[key]}
              onChange={(e) =>
                setModalData({ ...modalData, [key]: parseInt(e.target.value) || 0 })
              }
            />
          </div>
        ))}
        <div className="modal-buttons">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setIsCollectorOrTruckModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

          <div className="chart-box">
            <h1>Waste Collected Percentage</h1>
            <Doughnut data={calculatePercentages()} />
          </div>
        </div>

        <div className="bar-chart-container">
  <Bar
    data={{
      labels: months, // Use the months array for the X-axis
      datasets: [
        {
          label: "Biodegradables",
          data: yearlyWasteData.map((data) => data.biodegradables || 0),
          backgroundColor: "#015a00",
        },
        {
          label: "Non-Biodegradables",
          data: yearlyWasteData.map((data) => data.nonBiodegradables || 0),
          backgroundColor: "#b8ff96",
        },
        {
          label: "Recyclables",
          data: yearlyWasteData.map((data) => data.recyclables || 0),
          backgroundColor: "#35a722",
        },
        {
          label: "Non-Recyclables",
          data: yearlyWasteData.map((data) => data.nonRecyclables || 0),
          backgroundColor: "#a7df8f",
        },
        {
          label: "E-Waste",
          data: yearlyWasteData.map((data) => data.eWaste || 0),
          backgroundColor: "#1ca445",
        },
      ],
    }}
    options={{
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Months",
          },
        },
        y: {
          min: 1, // Set the minimum value for the Y-axis
          max: 500, // Set the maximum value for the Y-axis
          ticks: {
            stepSize: 50, // Adjust the interval between ticks
            callback: (value) => Math.round(value),
          },
          title: {
            display: true,
            text: "Waste Collected (by sack)", // Update the label for the Y-axis
          },
        },
      },
    }}
  />
</div>


      </div>
      
      {isUpdateModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h3 className="modal-title">Update Waste Stats</h3>
      <form className="modal-form" onSubmit={handleUpdateSubmit}>
        {/* Explicitly define waste-related fields */}
        <div className="form-group">
          <label className="form-label">BIODEGRADABLES</label>
          <input
            type="number"
            className="form-input"
            value={wasteData.biodegradables}
            onChange={(e) =>
              setWasteData({ ...wasteData, biodegradables: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">NON-BIODEGRADABLES</label>
          <input
            type="number"
            className="form-input"
            value={wasteData.nonBiodegradables}
            onChange={(e) =>
              setWasteData({ ...wasteData, nonBiodegradables: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">RECYCLABLES</label>
          <input
            type="number"
            className="form-input"
            value={wasteData.recyclables}
            onChange={(e) =>
              setWasteData({ ...wasteData, recyclables: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">NON-RECYCLABLES</label>
          <input
            type="number"
            className="form-input"
            value={wasteData.nonRecyclables}
            onChange={(e) =>
              setWasteData({ ...wasteData, nonRecyclables: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">E-WASTE</label>
          <input
            type="number"
            className="form-input"
            value={wasteData.eWaste}
            onChange={(e) =>
              setWasteData({ ...wasteData, eWaste: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="modal-buttons">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setIsUpdateModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default WCDash;
