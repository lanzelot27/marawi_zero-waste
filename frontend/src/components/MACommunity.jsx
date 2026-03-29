import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import './Admin.css';
import './Modal.css';
import axios from 'axios';

function MACommunity() {
    const [communityAccounts, setCommunityAccounts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const [accountForm, setAccountForm] = useState({
      userType: 'Community',
      firstName: '',
      lastName: '',
      province: 'Lanao del Sur',
      city: 'Marawi City',
      barangay: 'none',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Fetch community accounts data
    useEffect(() => {
        const fetchCommunityAccounts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/community-accounts', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCommunityAccounts(response.data);
            } catch (error) {
                console.error('Error fetching community accounts:', error);
            }
        };
        fetchCommunityAccounts();
    }, []);

    // Open modal for adding or editing
    const openModal = (account = null) => {
        if (account) {
            setEditMode(true);
            setSelectedAccount(account);
            setAccountForm({
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
                password: '',
                confirmPassword: '',
            });
        } else {
            setEditMode(false);
            setAccountForm({
              userType: 'Community',
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
        setAccountForm({ ...accountForm, [name]: value });
    };

    // Handle form submission for add or update
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Check if passwords match only when editing password
      if (accountForm.password || accountForm.confirmPassword) {
          if (accountForm.password !== accountForm.confirmPassword) {
              alert('Passwords do not match!');
              return;
          }
      }
  
      try {
          const token = localStorage.getItem('token');
  
          if (editMode) {
              // Prepare payload for update
              const updateData = {
                  firstName: accountForm.firstName,
                  lastName: accountForm.lastName,
                  email: accountForm.email,
              };
  
              // Include password fields only if they are filled
              if (accountForm.password) {
                  updateData.password = accountForm.password;
              }
  
              // Update community account
              await axios.put(
                  `http://localhost:5000/api/auth/update-community-account/${selectedAccount._id}`,
                  updateData,
                  { headers: { Authorization: `Bearer ${token}` } }
              );
              alert('Community account updated successfully!');
          } else {
              // Add new community account
              await axios.post('http://localhost:5000/api/auth/register', accountForm, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              alert('Community account added successfully!');
          }
  
          // Refresh accounts list
          const refreshedAccounts = await axios.get('http://localhost:5000/api/auth/community-accounts', {
              headers: { Authorization: `Bearer ${token}` },
          });
          setCommunityAccounts(refreshedAccounts.data);
          setShowModal(false);
      } catch (error) {
          console.error('Error saving community account:', error);
          alert('Failed to save community account.');
      }
  };
  

    // Handle delete account
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this community account?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/auth/delete-community-account/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Community account deleted successfully!');

                // Refresh accounts list
                const refreshedAccounts = await axios.get('http://localhost:5000/api/auth/community-accounts', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCommunityAccounts(refreshedAccounts.data);
            } catch (error) {
                console.error('Error deleting community account:', error);
                alert('Failed to delete community account.');
            }
        }
    };

    return (
        <div className="admin-page">
            <AdminSidebar />
            <div className="admin-content">
                <div className="manage-accounts-header">
                    <h1>MANAGE COMMUNITY ACCOUNTS</h1>
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
                        {communityAccounts.map((account) => (
                            <tr key={account._id}>
                                <td>{account.email}</td>
                                <td>{`${account.firstName} ${account.lastName}`}</td>
                                <td>{account.status || 'Active'}</td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => openModal(account)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="action-btn del-btn"
                                        onClick={() => handleDelete(account._id)}
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
                            <h2>{editMode ? 'Edit Community Account' : 'Add Community Account'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={accountForm.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={accountForm.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={accountForm.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={accountForm.password}
                                        onChange={handleInputChange}
                                        required={!editMode} // Optional if editing
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={accountForm.confirmPassword}
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

export default MACommunity;
