import React, { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import msuOpacity from '../assets/msuOpacity.png';
import { AuthContext } from '../AuthContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        // Retrieve the userType from the response data
        const { token, userType } = response.data;
  
        // Save the token to your authentication context or local storage
        login(token);
  
        // Navigate to the respective dashboard based on userType
        switch (userType) {
          case "Admin":
            navigate('/admin');
            break;
          case "Community":
            navigate('/community');
            break;
          case "Collector":
            navigate('/wastecollector');
            break;
          default:
            console.error("Unknown user type:", userType);
            alert("An error occurred. Please contact support.");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data.message : error.message);
      alert(error.response ? error.response.data.message : "An error occurred. Please try again.");
    }
  };
  

  return (
    <section className="bg-cover bg-center" style={{ backgroundImage: `url(${msuOpacity})`, height: '100vh' }}>
      <div className="max_padd_container flexCenter flex-col pt-40">
        <div className="max-w-[280px] bg-white m-auto px-6 py-4 rounded-3xl border border-black" style={{ minWidth: '260px' }}>
          <h3 className="flexCenter font-calistoga text-xl text-black mt-2">Login</h3>
          <div className="flex flex-col gap-1 mt-5">
            <label htmlFor="email" className="text-black font-roboto text-sm mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              className="border-b border-black outline-none text-sm font-arial mb-3" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="text-black font-roboto text-sm mb-1">Password</label>
            <div className="relative">
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
          <div className="flexCenter">
            <button 
              onClick={handleLogin} 
              className="btn_dark_square my-4 w-[130px] md:w-[130px] h-[30px] font-open-sans text-sm text-white"
              style={{ backgroundColor: '#015A00' }}
            >
              Login
            </button>
          </div>
          <p className="flexCenter text-black font-bold text-xs mt-1">
            Don't have an account? <Link to="/register" className="font-caladea" style={{ color: '#25492B', marginLeft: '0.2rem', textDecoration: 'underline' }}>Register</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
