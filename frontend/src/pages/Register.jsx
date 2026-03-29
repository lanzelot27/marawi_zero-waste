import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import msuOpacity from '../assets/msuOpacity.png';
import Modal from "../components/Modal";
import axios from 'axios';


const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [barangay, setBarangay] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const [userType, setUserType] = useState('Community');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [province, setProvince] = useState('Lanao del Sur');
    const [city, setCity] = useState('Marawi City');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    
    const handleRegister = async () => {

        if (!isTermsAccepted) {
            alert("You must accept the terms and conditions to proceed.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                userType,
                firstName,
                lastName,
                province,
                city,
                barangay,
                email,
                password,
                confirmPassword,
                termsAccepted: true,
            });
    
            if (response.status === 201) {
                // Display success modal
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Registration failed:", error.response ? error.response.data.message : error.message);
            alert(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };
    

    return (
        <section className="bg-cover bg-center" style={{ backgroundImage: `url(${msuOpacity})`, height: '100vh' }}>
            <div className="max_padd_container flexCenter flex-col pt-20">
                <div className="max-w-[600px] w-full bg-white m-auto px-8 py-6 rounded-3xl border border-black">
                    <h3 className="flexCenter font-calistoga text-xl text-black mt-2">Create an Account</h3>
                    <div className="flex flex-col gap-4 mt-5">
                        {/* First Name and Last Name */}
                        
                        <div className="flex gap-4">
                                
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="firstName" className="text-black font-roboto text-xs mb-1">First Name</label>
                                <input type="text" id="firstName" className="border-b border-black outline-none text-sm font-arial mb-1 w-full"
                                onChange={(e) => setFirstName(e.target.value)}
                                 />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="lastName" className="text-black font-roboto text-xs mb-1">Last Name</label>
                                <input type="text" id="lastName" className="border-b border-black outline-none text-sm font-arial mb-1 w-full" 
                                onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                        </div>

                        {/* Address Label */}
                        <label className="text-black font-roboto text-xs mb-1">Address</label>

                        {/* Province and City */}
                        <div className="flex gap-4">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="province" className="text-black font-roboto text-xs mb-1">Province</label>
                                <input
                                    type="text"
                                    id="province"
                                    value="Lanao del Sur"
                                    
                                    className="border-b border-black outline-none text-sm font-arial mb-1 w-full"
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="city" className="text-black font-roboto text-xs mb-1">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    value="Marawi City"
                                    
                                    className="border-b border-black outline-none text-sm font-arial mb-1 w-full"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Barangay */}
                        <label htmlFor="barangay" className="text-black font-roboto text-xs mb-1">Barangay</label>
                        <select
                            id="barangay"
                            value={barangay}
                            onChange={(e) => setBarangay(e.target.value)}
                            className="border-b border-black outline-none text-sm font-arial mb-1 w-full"
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

                        {/* Email Address */}
                        <label htmlFor="email" className="text-black font-roboto text-xs mb-1">Email Address</label>
                        <input type="email" id="email" className="border-b border-black outline-none text-sm font-arial mb-1 w-full" 
                        onChange={(e) => setEmail(e.target.value)}/>

                        {/* Password and Confirm Password */}
                        <div className="flex gap-4">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="password" className="text-black font-roboto text-xs mb-1">Password</label>
                                <div className="relative mb-1">
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        id="password"
                                        className="border-b border-black outline-none text-sm font-arial w-full text-black"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="confirmPassword" className="text-black font-roboto text-xs mb-1">Confirm Password</label>
                                <div className="relative mb-1">
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        id="confirmPassword"
                                        className="border-b border-black outline-none text-sm font-arial w-full text-black"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Terms and Conditions */}
                    <div className="flex items-center gap-2 mt-4">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={isTermsAccepted}
                                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-sm">
                                I have read and accept the <span 
                                    className="text-blue-500 cursor-pointer underline"
                                    onClick={() => setIsTermsModalOpen(true)}
                                >
                                    terms and conditions
                                </span>.
                            </label>
                        </div>
                   
                    <div className="flexCenter">
                    <button
                                onClick={handleRegister}
                                className="btn_dark_square my-4 w-[130px] md:w-[130px] h-[30px] font-open-sans text-sm text-white"
                                style={{ backgroundColor: '#015A00' }}
                            >
                                Sign Up
                            </button>
                    </div>
                    <p className="flexCenter text-black font-bold text-xs mt-1">Already have an account?<Link to="/login" className="font-caladea" style={{ color: '#25492B', marginLeft: '0.2rem', textDecoration: 'underline' }}>Login</Link></p>
                </div>
            </div>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                 {/* Terms and Conditions Modal */}
            {isTermsModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Terms and Conditions</h2>
                        <p>
                            Welcome to MARAWI Zero-Waste. By registering, you agree to the following terms:
                            <ul className="mt-2 list-disc list-inside">
                                <li>You will abide by the community rules and guidelines.</li>
                                <li>Your personal information will be used for community engagement and waste management services.</li>
                                <li>MARAWI Zero-Waste reserves the right to revoke access for any misconduct.</li>
                                <li>Your data will be stored securely and not shared with third parties without consent.</li>
                            </ul>
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                className="btn_secondary"
                                onClick={() => setIsTermsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}


export default Register;