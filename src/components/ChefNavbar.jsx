import React from 'react';
import { Link } from 'react-router-dom';
import './SideNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faSignOutAlt, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

const ChefNavbar = () => {
  return (
    <div className="side-navbar">
      <ul>
        <li>
          <Link to="#s" className="logo">
            <span className="nav-icons">Chef Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/chef/profile">
            <FontAwesomeIcon icon={faUser} className="navbar-icon" />
            <span className="nav-icons">Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/chef/orders">
            <FontAwesomeIcon icon={faCartShopping} className="navbar-icon" />
            <span className="nav-icons">Orders</span>
          </Link>
        </li>
        <li>
          <Link to="/chef/menu">
            <FontAwesomeIcon icon={faSquareMinus} className="navbar-icon" />
            <span className="nav-icons">Menu</span>
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

export default ChefNavbar;


