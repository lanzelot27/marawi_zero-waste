import React, { useState, useEffect } from "react";
import CommunitySidebar from "./CommunitySidebar";
import "./PointSystem.css";
import axios from "axios";

function PointSystem() {
    const [userPoints, setUserPoints] = useState(0);
    const [userName, setUserName] = useState("User"); // Default name
    const [wasteOptions, setWasteOptions] = useState([]);


    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/points/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { points, firstName, lastName } = response.data;
                setUserPoints(points);
                setUserName(`${firstName} ${lastName}`);
            } catch (error) {
                console.error("Error fetching user points:", error);
            }
        };

        fetchUserPoints();
    }, []);

    useEffect(() => {
    const fetchWasteOptions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/resources");
            setWasteOptions(response.data); // entire resource array with name/type
        } catch (error) {
            console.error("Error fetching waste resources:", error);
        }
    };

    fetchWasteOptions();
}, []);



    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        typeOfWaste: '',
        nameOfWaste: '',
        message: '',
        photo: null,
    });

    const pointOptions = [
        { name: "Gcash", image: "/src/assets/gcash.png" },
        { name: "Food", image: "/src/assets/food.png" },
        { name: "Load", image: "/src/assets/load.png" },
    ];

    const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevFormData => ({
    ...prevFormData,
    [name]: value,
    ...(name === 'typeOfWaste' && { nameOfWaste: '' }),
  }));
};


    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const token = localStorage.getItem("token");
    
            // Prepare form data for submission
            const formDataToSend = new FormData();
            formDataToSend.append("typeOfWaste", formData.typeOfWaste);
            formDataToSend.append("nameOfWaste", formData.nameOfWaste);
            formDataToSend.append("message", formData.message);
            if (formData.photo) {
                formDataToSend.append("photo", formData.photo);
            }
    
            // Send data to the backend
            const response = await axios.post(
                "http://localhost:5000/api/proof",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                }
            );
    
            alert("Proof sent successfully!");
            setShowModal(false); // Close the modal
            setFormData({
                typeOfWaste: "",
                nameOfWaste: "",
                message: "",
                photo: null,
            }); // Reset form
        } catch (error) {
            console.error("Error submitting proof:", error);
            alert("Failed to send proof. Please try again.");
        }
    };

    return (
        <div className="point-system-page">
            <CommunitySidebar />
            <div className="point-system-container">
                {/* User Info Container */}
                <div className="user-info-container">
                    <h1>
                        Hello, <span className="user-name">{userName}</span>
                    </h1>
                    <h2>
                        Your Points: <span className="points">{userPoints}</span>
                    </h2>

                    <div className="how-to-earn">
                        <h3>How to Earn Points?</h3>
                        <ul>
                            <li><strong>Step 1:</strong> Go to the <strong>Resources</strong> section in the menu.</li>
                            <li><strong>Step 2:</strong> Check how many points your waste has (e.g., fruit peels under Biodegradables have 1 point).</li>
                            <li><strong>Step 3:</strong> Go back to the <strong>Point System</strong> and click the <strong>Get Points</strong> button.</li>
                            <li><strong>Step 4:</strong> Fill out the form and upload proof (e.g., picture of the collected waste).</li>
                        </ul>
                        <button className="points-btn" onClick={() => setShowModal(true)}>GET POINTS</button>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Get Points</h3>
                            <form>
                                <label>
                                    Type of Waste:
                                    <select
                                        name="typeOfWaste"
                                        value={formData.typeOfWaste}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>--Select Waste Type--</option>
                                        <option value="biodegradable">Biodegradables</option>
                                        <option value="non-biodegradable">Non-Biodegradables</option>
                                        <option value="recyclables">Recyclables</option>
                                        <option value="non-recyclables">Non-Recyclables</option>
                                        <option value="e-wastes">E-Waste</option>
                                    </select>
                                </label>
                                <label>
    Name of Waste:
    <select
        name="nameOfWaste"
        value={formData.nameOfWaste}
        onChange={handleInputChange}
        disabled={!formData.typeOfWaste}
    >
        <option value="">-- Select Waste --</option>
        {wasteOptions
            .filter(option => option.type === formData.typeOfWaste)
            .map((option, index) => (
                <option key={index} value={option.name}>
                    {option.name}
                </option>
            ))}
    </select>
</label>

                                <label>
                                    Message:
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Add a message"
                                    />
                                </label>
                                <label>
                                    Photo:
                                    <input type="file" onChange={handleFileChange} />
                                </label>
                                <div className="modal-buttons">
                                    <button type="button" onClick={handleSubmit}>Send</button>
                                    <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Point Variations Section */}
                <div className="point-variations">
                    <h3>Point Variations</h3>
                    <ul>
                        <li>20 Points = Load (₱20)</li>
                        <li>30 Points = Food Voucher (₱50)</li>
                        <li>50 Points = Gcash (₱50)</li>
                    </ul>
                </div>

                

                {/* Options Container */}
                <div className="options-container">
                    <div className="sub-header">
                        <h3>Exchange your points:</h3>
                    </div>
                    <div className="options-grid">
                        {pointOptions.map((option, index) => (
                            <div className="option-card" key={index}>
                                <div className="image-wrapper">
                                    <img
                                        src={option.image}
                                        alt={option.name}
                                        className="option-image"
                                    />
                                </div>
                                <p className="option-name">{option.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PointSystem;
