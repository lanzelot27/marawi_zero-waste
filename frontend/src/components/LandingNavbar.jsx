import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const LandingNavbar = ({ containerStyles }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout(); // Call logout function to clear authentication state
    navigate("/"); // Navigate to the home page
  };

  return (
    <nav className={`${containerStyles} flex items-center gap-4`}>
      {!isLoggedIn && (
        <>
          <NavLink to="/" className="white_link">Home</NavLink>
          <NavLink to="/about" className="white_link">About Us</NavLink>
          <NavLink to="/contacts" className="white_link">Contacts</NavLink>
        </>
      )}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="nav_item btn_secondary_rounded"
          style={{
            backgroundColor: 'red',
            padding: '0.5rem 1.3rem',
            borderRadius: '999px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Logout
        </button>
      ) : (
        <NavLink
          to="/login"
          className="nav_item btn_secondary_rounded"
          style={{
            backgroundColor: '#8FC796',
            padding: '0.5rem 1.3rem',
            borderRadius: '999px',
            fontWeight: 'normal',
          }}
        >
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default LandingNavbar;
