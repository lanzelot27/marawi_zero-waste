import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-90 p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-black font-bold text-xl mb-4" style={{ fontFamily: 'Cambria' }}>
          Registration Successful
        </h3>
        <p className="text-black text-sm mb-6" style={{ fontFamily: 'Cambria' }}>
          You've successfully registered. You can now login.
        </p>
        <Link to="/login">
          <button
            className="bg-green-700 text-white w-full py-2 rounded-md font-normal"
            onClick={onClose}
          >
            Back to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
