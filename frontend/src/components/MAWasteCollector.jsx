import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import './Admin.css';
import './Modal.css';
import axios from 'axios';

function MAWasteCollector() {
    const [wasteCollectors, setWasteCollectors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCollector, setSelectedCollector] = useState(null);

    const [collectorForm, setCollectorForm] = useState({
      userType: 'Collector',
      firstName: '',
      lastName: '',
      province: 'Lanao del Sur',
      city: 'Marawi City',
      barangay: 'none',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Fetch waste collector data
    useEffect(() => {
        const fetchWasteCollectors = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/waste-collectors', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWasteCollectors(response.data);
            } catch (error) {
                console.error('Error fetching waste collectors:', error);
            }
        };
        fetchWasteCollectors();
    }, []);

    // Open modal for adding or editing
    const openModal = (collector = null) => {
        if (collector) {
            setEditMode(true);
            setSelectedCollector(collector);
            setCollectorForm({
                firstName: collector.firstName,
                lastName: collector.lastName,
                email: collector.email,
                password: '',
                confirmPassword: '',
            });
        } else {
            setEditMode(false);
            setCollectorForm({
              userType: 'Collector',
              firstName: '',
              lastName: '',
              province: 'Lanao del Sur',
              city: 'Marawi City',
              barangay: 'none',
              email: '',
              password: '',
              confirmPassword: '',
            });
        }
        setShowModal(true);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCollectorForm({ ...collectorForm, [name]: value });
    };

    // Handle form submission for add or update
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Check if passwords match only when editing password
      if (collectorForm.password || collectorForm.confirmPassword) {
          if (collectorForm.password !== collectorForm.confirmPassword) {
              alert('Passwords do not match!');
              return;
          }
      }
  
      try {
          const token = localStorage.getItem('token');
  
          if (editMode) {
              // Prepare payload for update
              const updateData = {
                  firstName: collectorForm.firstName,
                  lastName: collectorForm.lastName,
                  email: collectorForm.email,
              };
  
              // Include password fields only if they are filled
              if (collectorForm.password) {
                  updateData.password = collectorForm.password;
              }
  
              // Update community account
              await axios.put(
                  `http://localhost:5000/api/auth/update-collector/${selectedCollector._id}`,
                  updateData,
                  { headers: { Authorization: `Bearer ${token}` } }
              );
              alert('Collector account updated successfully!');
          } else {
              // Add new community account
              await axios.post('http://localhost:5000/api/auth/register', collectorForm, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              alert('Collector account added successfully!');
          }
  
          // Refresh accounts list
          const refreshedCollectors = await axios.get('http://localhost:5000/api/auth/waste-collectors', {
            headers: { Authorization: `Bearer ${token}` },
        });
          setWasteCollectors(refreshedCollectors.data);
          setShowModal(false);
      } catch (error) {
          console.error('Error saving collector account:', error);
          alert('Failed to save collector account.');
      }
  };

    // Handle delete collector
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this collector?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/auth/delete-collector/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Collector deleted successfully!');

                // Refresh collector list
                const refreshedCollectors = await axios.get('http://localhost:5000/api/auth/waste-collectors', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWasteCollectors(refreshedCollectors.data);
            } catch (error) {
                console.error('Error deleting collector:', error);
                alert('Failed to delete collector.');
            }
        }
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-accounts-header">
                    <h1>MANAGE WASTE COLLECTOR ACCOUNTS</h1>
                    <button className="add-account-btn" onClick={() => openModal()}>
                        ADD ACCOUNTS +
                    </button>
                </div>

                <table className="account-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wasteCollectors.map((collector) => (
                            <tr key={collector._id}>
                                <td>{collector.email}</td>
                                <td>{`${collector.firstName} ${collector.lastName}`}</td>
                                <td>{collector.status || 'Active'}</td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => openModal(collector)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="action-btn del-btn"
                                        onClick={() => handleDelete(collector._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h2>{editMode ? 'Edit Waste Collector' : 'Add Waste Collector'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={collectorForm.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={collectorForm.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={collectorForm.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={collectorForm.password}
                                        onChange={handleInputChange}
                                        required={!editMode} // Optional if editing
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={collectorForm.confirmPassword}
                                        onChange={handleInputChange}
                                        required={!editMode} // Optional if editing
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="submit" className="action-btn save-btn">
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="action-btn cancel-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MAWasteCollector;
