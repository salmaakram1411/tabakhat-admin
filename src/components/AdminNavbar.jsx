import React from 'react';
import { Link } from 'react-router-dom';
import './SideNavbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUtensils, faAddressCard, faCartShopping, faSpinner, faCartPlus, faPlus, faSignOutAlt, faHouse } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
  return (
    <div className="side-navbar">
      <ul>
        <li>
          <Link to="#s" className="logo">
            <span className="nav-icons">Admin Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/home">
            <FontAwesomeIcon icon={faHouse} className="navbar-icon" />
            <span className="nav-icons">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/profile">
            <FontAwesomeIcon icon={faUser} className="navbar-icon" />
            <span className="nav-icons">Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/chefs-list">
            <FontAwesomeIcon icon={faUtensils} className="navbar-icon" />
            <span className="nav-icons">Chefs</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <FontAwesomeIcon icon={faAddressCard} className="navbar-icon" />
            <span className="nav-icons">Users</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/orders">
            <FontAwesomeIcon icon={faCartShopping} className="navbar-icon" />
            <span className="nav-icons">Orders</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/pending-chefs">
            <FontAwesomeIcon icon={faSpinner} className="navbar-icon" />
            <span className="nav-icons">Pending Chefs</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/total-orders">
            <FontAwesomeIcon icon={faCartPlus} className="navbar-icon" />
            <span className="nav-icons">Total Orders</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/add-admin">
            <FontAwesomeIcon icon={faPlus} className="navbar-icon" />
            <span className="nav-icons">Add Admin</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" />
            <span className="nav-icons">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;




