import React from 'react';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import './Admin.css';

function ManageAccounts() {
  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-content">
        <div className="manage-accounts-header">
          <h1>MANAGE ACCOUNTS</h1>
            
        </div>

        {/* Account Boxes */}
        <div className="account-boxes">
          <Link to="/manage-accounts/waste-collector" className="account-box">Waste Collector</Link>
          <Link to="/manage-accounts/community" className="account-box">Community</Link>
        </div>
      </div>
    </div>
  );
}

export default ManageAccounts;
