import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import './ManageProof.css';
import axios from 'axios';

function ManageProof() {
    const [proofs, setProofs] = useState([]);
    const [activeProof, setActiveProof] = useState(null);
    const [resources, setResources] = useState([]);


    // Fetch proofs from the backend
    useEffect(() => {
        const fetchProofs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/proof', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProofs(response.data);
            } catch (error) {
                console.error('Error fetching proofs:', error);
            }
        };

        fetchProofs();
    }, []);

    useEffect(() => {
    const fetchResources = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/resources");
            setResources(res.data);
        } catch (error) {
            console.error("Error fetching resources:", error);
        }
    };

    fetchResources();
}, []);
const handleAddPoints = async () => {
    const confirmAdd = window.confirm("Are you sure you want to add the points for this waste?");
    if (!confirmAdd) return;

    try {
        // 1. Fetch matching waste resource
        const resourceResponse = await axios.get("http://localhost:5000/api/resources");
        const resource = resourceResponse.data.find(
            (res) => res.name.toLowerCase() === activeProof.nameOfWaste.toLowerCase()
        );

        if (!resource) {
            alert("Matching waste resource not found.");
            return;
        }

        const pointsToAdd = resource.points;
        const userId = activeProof.user._id;

        // 2. Add points to the user
        await axios.put(`http://localhost:5000/api/points/${userId}`, {
            points: pointsToAdd,
        });

        // 3. Delete the proof
        await axios.delete(`http://localhost:5000/api/proof/${activeProof._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        alert(`✅ ${pointsToAdd} points added to ${activeProof.user.firstName} and proof deleted!`);

        // 4. Update UI
        setProofs(proofs.filter((p) => p._id !== activeProof._id));
        setActiveProof(null);
    } catch (error) {
        console.error("Failed to add points and delete proof:", error);
        alert("❌ Error occurred. Please try again.");
    }
};



const getPointsForWaste = (wasteName) => {
    const match = resources.find((res) => res.name === wasteName);
    return match ? match.points : "Unknown";
};

    // Handle Delete Proof
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this proof?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/proof/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Proof deleted successfully!');
                setProofs(proofs.filter((proof) => proof._id !== id));
                if (activeProof?._id === id) setActiveProof(null);
            } catch (error) {
                console.error('Error deleting proof:', error);
                alert('Failed to delete proof. Please try again.');
            }
        }
    };

    // Handle View Proof
    const handleView = (id) => {
        const proof = proofs.find((p) => p._id === id);
        setActiveProof(proof);
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-proof-header">
                    <h1>MANAGE PROOF</h1>
                </div>

                {/* Proof List */}
                {!activeProof && (
                    <div className="proofs-container">
                        {proofs.length > 0 ? (
                            proofs.map((proof) => (
                                <div key={proof._id} className="proof-card">
                                    <div className="proof-header">
                                        <h3>{`${proof.user.firstName} ${proof.user.lastName}`}</h3>
                                    </div>
                                    <div className="proof-body">
                                        <p><strong>Waste Type:</strong> {proof.typeOfWaste}</p>
                                        <p><strong>Waste Name:</strong> {proof.nameOfWaste}</p>
                                        <p><strong>Message:</strong> {proof.message}</p>
                                    </div>
                                    <div className="proof-footer">
                                        <span>{new Date(proof.createdAt).toLocaleDateString()}</span>
                                        <div className="action-buttons">
                                            <button
                                                className="view-button"
                                                onClick={() => handleView(proof._id)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(proof._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-proofs">No proofs available.</p>
                        )}
                    </div>
                )}

                {/* View Proof Modal */}
                {activeProof && (
                    <div className="view-proof-modal">
                        <div className="modal-header">
                            <h3>Proof from {`${activeProof.user.firstName} ${activeProof.user.lastName}`}</h3>
                            <button
                                className="close-modal"
                                onClick={() => setActiveProof(null)}
                            >
                                ✖
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Waste Type:</strong> {activeProof.typeOfWaste}</p>
                            <p><strong>Waste Name:</strong> {activeProof.nameOfWaste}</p>
                            <p><strong>Message:</strong> {activeProof.message}</p>
                            <p>
  <strong>Points for "{activeProof.nameOfWaste}":</strong> {getPointsForWaste(activeProof.nameOfWaste)}
</p>
                            <img
                                src={`http://localhost:5000/uploads/${activeProof.photo}`}
                                alt="Proof"
                                className="proof-image"
                            />
                            <div style={{ marginTop: "10px", textAlign: "right" }}>
    <button onClick={handleAddPoints} className="add-points-btn">Add</button>
</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageProof;
