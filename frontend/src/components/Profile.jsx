import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CommunitySidebar from './CommunitySidebar';
import './Profile.css';
import axios from 'axios';


function Profile() {
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);
    // State for user data and view mode
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    // State for password change
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordError, setPasswordError] = useState('');

    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [profilePic, setProfilePic] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');

    


    const toggleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisible(!currentPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };


    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found in localStorage.");
                return;
            }

            const response = await axios.get('http://localhost:5000/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Log the entire response to inspect it
            console.log('Fetched user data:', response.data);

            // Set user data
            setUserData(response.data);

            // Set profile picture if available, otherwise use default
            if (response.data.profilePic) {
                setProfilePic(`http://localhost:5000${response.data.profilePic}`);
            } else {
                setProfilePic('/uploads/default-avatar.jpg');
            }
        } catch (error) {
            console.error("Error fetching user data:", error.response || error.message || error);
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);


    useEffect(() => {
        console.log('Updated profilePic from useEffect:', profilePic);
      }, [profilePic]);
      

    // Handle input changes for profile editing
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Handle input changes for password change
    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    };

    // Save updated profile data
    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found in localStorage.");
                return;
            }
    
            // Send updated data to the backend
            const response = await axios.put(
                'http://localhost:5000/api/auth/update-profile', // Use the new route
                {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    province: userData.province,
                    city: userData.city,
                    barangay: userData.barangay,
                    email: userData.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            // Update local state with new data
            setUserData(response.data);
    
            // Switch back to view mode
            setIsEditing(false);
    
            // Log success message to console
            console.log("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message || error);
        }
    };
    

    // Handle password update
    const handleChangePassword = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordForm;

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:5000/api/auth/change-password',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            alert('Password updated successfully!');
            setIsChangingPassword(false); // Close the form
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            }); // Reset form
            setPasswordError('');
        } catch (error) {
            setPasswordError(
                error.response?.data?.message || 'Error updating password.'
            );
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    
    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select an image to upload.');
            return;
        }
    
        const formData = new FormData();
        formData.append('profilePic', selectedFile);
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:5000/api/auth/upload-profile-pic',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
    
            // Set the updated profilePic URL directly
            const updatedProfilePicUrl = `http://localhost:5000${response.data.profilePic}`;
            setProfilePic(updatedProfilePicUrl);
            setUserData((prevData) => ({
                ...prevData,
                profilePic: response.data.profilePic
            }));
            setPreview(''); // Reset the preview after successful upload
            
            // Log the new profilePic value
            console.log('Profile picture updated to:', updatedProfilePicUrl);

            await fetchUserData();
            window.location.reload();
            alert('Profile picture uploaded successfully!');
            
        } catch (error) {
            console.error('Error uploading profile picture:', error.response?.data || error.message || error);
            alert('Failed to upload profile picture.');
        }
    };
    
    
    

    return (
        <div className="community-page profile-page">
            <CommunitySidebar />
            
            <div className="community-content">
                <div className="profile-header">
                    <div className="profile-container">
                        <h2 className="profile-title">PROFILE</h2>
                            <div className="profile-pic">
                            <img
    src={preview || profilePic}
    alt="Profile"
    className="profile-pic-img"
    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
/>

</div>

{/* Hidden file input */}
<input
    type="file"
    accept="image/*"
    id="profile-pic-input"
    style={{ display: 'none' }}
    onChange={handleImageChange}
/>

{/* "Choose Photo" and "Upload Image" buttons toggle visibility */}
{!selectedFile ? (
    <button
        className="photo-button"
        onClick={() => document.getElementById('profile-pic-input').click()}
    >
        Choose Photo
    </button>
) : (
    <button className="photo-button" onClick={handleUpload}>
        Upload Image
    </button>
)}

                        </div>

                    {/* Toggle between view and edit modes */}
                    {!isEditing && !isChangingPassword ? (
                        <div className="account-details-container">
                            <div className="account-details-header">
                                <h2>Account Details</h2>
                            </div>
                            <div className="account-details">
                                <p><strong>First Name:</strong> {userData.firstName}</p>
                                <p><strong>Last Name:</strong> {userData.lastName}</p>
                                <p><strong>Province:</strong> {userData.province}</p>
                                <p><strong>City:</strong> {userData.city}</p>
                                <p><strong>Barangay:</strong> {userData.barangay}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                            </div>
                            <button
                                className="edit-button"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                            <button
                                className="edit-button"
                                onClick={() => setIsChangingPassword(true)}
                            >
                                Change Password
                            </button>
                        </div>
                    ) : isEditing ? (
                        <div className="account-details-container">
                            <div className="account-details-header">
                                <h2>Edit Account Details</h2>
                            </div>
                            <div className="account-details-form">
                                <div className="input-group">
                                    <label htmlFor="first-name">First Name</label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        name="firstName"
                                        value={userData.firstName || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="last-name">Last Name</label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="lastName"
                                        value={userData.lastName || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="province">Province</label>
                                    <input
                                        type="text"
                                        id="province"
                                        name="province"
                                        value={userData.province || ''}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={userData.city || ''}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="barangay">Barangay</label>
                                    <select
                                        id="barangay"
                                        name="barangay"
                                        value={userData.barangay || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select Barangay</option>
                                        <option value="Banga">Banga</option>
                                        <option value="Biaba-Damag">Biaba-Damag</option>
                                        <option value="Cabingan">Cabingan</option>
                                        <option value="Cadayonan">Cadayonan</option>
                                        <option value="Dimalna">Dimalna</option>
                                        <option value="Lomidong">Lomidong</option>
                                        <option value="Rapasun">Rapasun</option>
                                    </select>
                                    
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userData.email || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="save-changes-container">
                                    <button
                                        className="save-changes-button"
                                        onClick={handleSaveChanges}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className="cancel-button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                     ) : (
                        <div className="account-details-container">
                            <div className="account-details-header">
                                <h2>Change Password</h2>
                            </div>
                            <div className="account-details-form">
                                {/* Current Password */}
                                <div className="input-group">
                                    <label htmlFor="current-password">Current Password</label>
                                    <div className="relative">
                                        <input
                                            type={currentPasswordVisible ? 'text' : 'password'}
                                            id="current-password"
                                            name="currentPassword"
                                            value={passwordForm.currentPassword}
                                            onChange={(e) =>
                                                setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                                            }
                                        />
                                        <span
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={toggleCurrentPasswordVisibility}
                                        >
                                            {currentPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="input-group">
                                    <label htmlFor="new-password">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={newPasswordVisible ? 'text' : 'password'}
                                            id="new-password"
                                            name="newPassword"
                                            value={passwordForm.newPassword}
                                            onChange={(e) =>
                                                setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                                            }
                                        />
                                        <span
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={toggleNewPasswordVisibility}
                                        >
                                            {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="input-group">
                                    <label htmlFor="confirm-password">Confirm New Password</label>
                                    <div className="relative">
                                        <input
                                            type={confirmPasswordVisible ? 'text' : 'password'}
                                            id="confirm-password"
                                            name="confirmPassword"
                                            value={passwordForm.confirmPassword}
                                            onChange={(e) =>
                                                setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                                            }
                                        />
                                        <span
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                {passwordError && <p className="error-text">{passwordError}</p>}

                                <div className="save-changes-container">
                                    <button className="save-changes-button" onClick={handleChangePassword}>
                                        Update Password
                                    </button>
                                    <button
                                        className="cancel-button"
                                        onClick={() => setIsChangingPassword(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
