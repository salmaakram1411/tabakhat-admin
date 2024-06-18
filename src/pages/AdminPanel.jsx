import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import './Panel.css';

const AdminPanel = () => {
  return (
    <div className="panel-container">
      <AdminNavbar />
      <div className="panel-content">
        <h2>Admin Panel</h2>
        <p>Welcome to the Admin Panel!</p>
      </div>
    </div>
  );
};

export default AdminPanel;













