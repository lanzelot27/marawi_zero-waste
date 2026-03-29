import React, { useState, useEffect } from "react";
import WCSidebar from "./WCSidebar";
import "./ManagePointSystem.css";
import axios from "axios";

function WCPointSystem() {
    const [users, setUsers] = useState([]);
    const [pointsInput, setPointsInput] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/points"); // Replace with your backend endpoint
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handlePointsChange = (e) => {
        setPointsInput(Number(e.target.value));
    };

    const handleAdjustPoints = async (id, type) => {
        const adjustValue = type === "add" ? pointsInput : -pointsInput;

        try {
            const response = await axios.put(`http://localhost:5000/api/points/${id}`, { points: adjustValue });
            setUsers(users.map(user => (user.id === id ? { ...user, points: response.data.points } : user)));
            setPointsInput(0);
        } catch (error) {
            console.error("Error adjusting points:", error);
        }
    };

    return (
        <div className="admin-page">
            <WCSidebar />
            <div className="admin-content">
                <div className="manage-accounts-header">
                    <h1>MANAGE POINT SYSTEM</h1>
                </div>
                <div className="manage-points-container">
                    <h2>User Points Management</h2>
                    <table className="points-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Current Points</th>
                                <th>Adjust Points</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.points}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={selectedUser === user.id ? pointsInput : ""}
                                            onChange={handlePointsChange}
                                            onFocus={() => setSelectedUser(user.id)}
                                            placeholder="Points"
                                            className="points-input"
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="add-points-btn"
                                            onClick={() => handleAdjustPoints(user.id, "add")}
                                            disabled={selectedUser !== user.id || pointsInput <= 0}
                                        >
                                            Add
                                        </button>
                                        <button
                                            className="deduct-points-btn"
                                            onClick={() => handleAdjustPoints(user.id, "deduct")}
                                            disabled={selectedUser !== user.id || pointsInput <= 0}
                                        >
                                            Deduct
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default WCPointSystem;
