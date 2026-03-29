import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./ManageSchedules.css";
import axios from "axios";

function ManageSchedules() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState('All'); // State to track selected filter
    const [schedules, setSchedules] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // For Add Modal
    const [currentSchedule, setCurrentSchedule] = useState(null); // For updating schedule
    const [isBatchModalOpen, setIsBatchModalOpen] = useState(false); // Batch Update Modal
const [batchFilter, setBatchFilter] = useState(""); // Selected waste type
const [batchUpdateFields, setBatchUpdateFields] = useState({
    status: "",
    schedule: "",
    cycle: "",
});

    const [newSchedule, setNewSchedule] = useState({
        location: "",
        status: "",
        waste: "",
        schedule: "",
        time: "",
        cycle: "",
    });
    const [updatedSchedule, setUpdatedSchedule] = useState({
        status: "",
        waste: "",
        schedule: "",
        time: "",
        cycle: "",
    });

    // Fetch schedules from the backend
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/schedules"
                ); // Replace with your backend endpoint
                setSchedules(response.data);
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };

        fetchSchedules();
    }, []);

    // Handle Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this schedule?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/schedules/${id}`);
            setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
            alert("Schedule deleted successfully.");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting schedule:", error);
            alert("Failed to delete schedule.");
        }
    };

    // Open Update Modal
    const handleUpdate = (schedule) => {
        setCurrentSchedule(schedule);
        setUpdatedSchedule(schedule); // Pre-fill the modal with current schedule data
        setIsModalOpen(true);
    };

    // Handle Update Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSchedule((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = async () => {
        try {
            // Format the schedule and time correctly
            const formattedSchedule = new Date(updatedSchedule.schedule).toISOString().split("T")[0]; // yyyy-MM-dd
            const formattedTime = updatedSchedule.time; // Should already be in HH:mm format from input[type="time"]
    
            const response = await axios.put(
                `http://localhost:5000/api/schedules/${currentSchedule._id}`, // Use `_id` here
                {
                    ...updatedSchedule,
                    schedule: formattedSchedule,
                    time: formattedTime,
                }
            );
    
            // Update the local state
            setSchedules((prev) =>
                prev.map((schedule) =>
                    schedule._id === currentSchedule._id ? response.data : schedule
                )
            );
            alert("Schedule updated successfully.");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating schedule:", error);
            alert("Failed to update schedule.");
        }
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewSchedule((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddSubmit = async () => {
        try {
            // Format `schedule` as "YYYY-MM-DD"
            const formattedSchedule = new Date(newSchedule.schedule).toISOString().split("T")[0];
    
            // Format `time` as "HH:mm" (24-hour format)
            const formattedTime = newSchedule.time.includes("AM") || newSchedule.time.includes("PM")
                ? new Date(`1970-01-01T${newSchedule.time}`).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                  })
                : newSchedule.time;
    
            // Manually create the payload with keys in the desired order
            const payload = {
                location: newSchedule.location,
                status: newSchedule.status,
                waste: newSchedule.waste,
                schedule: formattedSchedule,
                time: formattedTime,
                cycle: newSchedule.cycle,
            };
    
            console.log("Submitting data:", JSON.stringify(payload)); // Log payload for verification
    
            // Send the POST request
            const response = await axios.post("http://localhost:5000/api/schedules", payload);
    
            // Update the UI and reset the form
            setSchedules([...schedules, response.data]);
            setIsAddModalOpen(false);
            setNewSchedule({
                location: "",
                status: "Pending",
                waste: "Biodegradables",
                schedule: "",
                time: "",
                cycle: "",
            });
    
            alert("New schedule added successfully!");
        } catch (error) {
            console.error("Error adding new schedule:", error.response?.data || error.message);
            alert(`Failed to add schedule. Error: ${error.response?.data?.message || "Unknown error"}`);
        }
    };
    
    const handleBatchInputChange = (e) => {
        const { name, value } = e.target;
        setBatchUpdateFields((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleBatchUpdateSubmit = async () => {
        try {
            const filteredSchedules = schedules.filter(
                (schedule) => schedule.waste === batchFilter
            );
    
            const updates = filteredSchedules.map(async (schedule) => {
                const updateData = {};
                if (batchUpdateFields.status) updateData.status = batchUpdateFields.status;
                if (batchUpdateFields.schedule)
                    updateData.schedule = new Date(batchUpdateFields.schedule).toISOString().split("T")[0];
                if (batchUpdateFields.cycle) updateData.cycle = batchUpdateFields.cycle;
    
                return axios.put(
                    `http://localhost:5000/api/schedules/${schedule._id}`,
                    updateData
                );
            });
    
            await Promise.all(updates);
    
            // Fetch updated schedules from the backend
            const response = await axios.get("http://localhost:5000/api/schedules");
            setSchedules(response.data);
    
            alert("Batch update completed successfully!");
            setIsBatchModalOpen(false);
        } catch (error) {
            console.error("Error during batch update:", error);
            alert("Failed to batch update schedules.");
        }
    };
    

   // Filter schedules based on search term and waste type
const filteredSchedules = schedules.filter((item) => {
    const matchesSearch = item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.waste.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
});


    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-accounts-header">
                    <h1>MANAGE SCHEDULES</h1>
                    <button
                        className="add-account-btn"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        ADD NEW +
                    </button>
                    <button
        className="batch-update-btn"
        onClick={() => setIsBatchModalOpen(true)}
    >
        BATCH UPDATE
    </button>
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

                {/* Schedule Cards */}
                <div className="schedule-cards-container">
    {filteredSchedules.length > 0 ? (
        filteredSchedules.map((item) => {
            // Format the schedule date
            const formattedDate = new Date(item.schedule).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            // Format the time to AM/PM
            const formattedTime = new Date(`1970-01-01T${item.time}:00`).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });

            return (
                <div className="schedule-card" key={item._id}>
                    <h2>Location Point: {item.location}</h2>
                    <p>
                        <strong>Status:</strong> {item.status}
                    </p>
                    <p>
                        <strong>Waste to Collect:</strong> {item.waste}
                    </p>
                    <p>
                        <strong>Schedule:</strong> {formattedDate}
                    </p>
                    <p>
                        <strong>Time:</strong> {formattedTime}
                    </p>
                    <p>
                        <strong>Cycle Period:</strong> {item.cycle}
                    </p>
                    <div className="card-buttons">
                        <button
                            className="update-btn"
                            onClick={() => handleUpdate(item)}
                        >
                            Update
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            );
        })
    ) : (
        <p>No schedules found.</p>
    )}
</div>

{isBatchModalOpen && (
    <div className="modal">
        <div className="modal-content">
            <h2>Batch Update Schedules</h2>
            <label>
                Waste Type:
                <select
                    value={batchFilter}
                    onChange={(e) => setBatchFilter(e.target.value)}
                >
                    <option value="" disabled>Select Waste Type</option>
                    <option value="Biodegradables">Biodegradables</option>
                    <option value="Non-Biodegradables">Non-Biodegradables</option>
                    <option value="Recyclables">Recyclables</option>
                    <option value="Non-Recyclables">Non-Recyclables</option>
                    <option value="E-Waste">E-Waste</option>
                </select>
            </label>
            <label>
                Status:
                <select
                    name="status"
                    value={batchUpdateFields.status}
                    onChange={handleBatchInputChange}
                >
                    <option value="">--No Change--</option>
                    <option value="Pending">Pending</option>
                    <option value="On Progress">On Progress</option>
                    <option value="Collected">Collected</option>
                </select>
            </label>
            <label>
                Schedule:
                <input
                    type="date"
                    name="schedule"
                    value={batchUpdateFields.schedule}
                    onChange={handleBatchInputChange}
                />
            </label>
            <label>
                Cycle Period:
                <input
                    type="text"
                    name="cycle"
                    value={batchUpdateFields.cycle}
                    onChange={handleBatchInputChange}
                />
            </label>
            <div className="modal-buttons">
                <button onClick={handleBatchUpdateSubmit}>Update</button>
                <button onClick={() => setIsBatchModalOpen(false)}>Cancel</button>
            </div>
        </div>
    </div>
)}


{/* Add New Schedule Modal */}
{isAddModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Add New Schedule</h2>
                            <label>
                                Location:
                                <input
                                    type="text"
                                    name="location"
                                    value={newSchedule.location}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <label>
                                Status:
                                <select
                                    name="status"
                                    value={newSchedule.status}
                                    onChange={handleAddInputChange}
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="On Progress">On Progress</option>
                                    <option value="Collected">Collected</option>
                                </select>
                            </label>
                            <label>
                                Waste to Collect:
                                <select
                                    name="waste"
                                    value={newSchedule.waste}
                                    onChange={handleAddInputChange}
                                >
                                    <option value="" disabled>Select Waste</option>
                                    <option value="Biodegradables">Biodegradables</option>
                                    <option value="Non-Biodegradables">Non-Biodegradables</option>
                                    <option value="Recyclables">Recyclables</option>
                                    <option value="Non-Recyclables">Non-Recyclables</option>
                                    <option value="E-Waste">E-Waste</option>
                                </select>
                            </label>
                            <label>
                                Schedule:
                                <input
                                    type="date"
                                    name="schedule"
                                    value={newSchedule.schedule}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <label>
                                Time:
                                <input
                                    type="time"
                                    name="time"
                                    value={newSchedule.time}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <label>
                                Cycle Period:
                                <input
                                    type="text"
                                    name="cycle"
                                    value={newSchedule.cycle}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <div className="modal-buttons">
                                <button onClick={handleAddSubmit}>Add</button>
                                <button onClick={() => setIsAddModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Update Modal */}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Update Schedule</h2>
                            <label>
                                Status:
                                <select
                                    name="status"
                                    value={updatedSchedule.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="On Progress">On Progress</option>
                                    <option value="Collected">Collected</option>
                                </select>
                            </label>
                            <label>
                                Waste to Collect:
                                <select
                                    name="waste"
                                    value={updatedSchedule.waste}
                                    onChange={handleInputChange}
                                >
                                    <option value="Biodegradables">Biodegradables</option>
                                    <option value="Non-Biodegradables">Non-Biodegradables</option>
                                    <option value="Recyclables">Recyclables</option>
                                    <option value="Non-Recyclables">Non-Recyclables</option>
                                    <option value="E-Waste">E-Waste</option>
                                </select>
                            </label>
                            <label>
                                Schedule:
                                <input
                                    type="date"
                                    name="schedule"
                                    value={updatedSchedule.schedule}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Time:
                                <input
                                    type="time"
                                    name="time"
                                    value={updatedSchedule.time}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Cycle Period:
                                <input
                                    type="text"
                                    name="cycle"
                                    value={updatedSchedule.cycle}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <div className="modal-buttons">
                                <button onClick={handleUpdateSubmit}>Save</button>
                                <button onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageSchedules;
