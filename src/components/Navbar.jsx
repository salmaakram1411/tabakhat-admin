import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/chefs" onClick={() => setIsOpen(false)}>Chefs</Link></li>
        <li><Link to="/users" onClick={() => setIsOpen(false)}>Users</Link></li>
        <li><Link to="/orders" onClick={() => setIsOpen(false)}>Orders</Link></li>
        <li><Link to="/admins" onClick={() => setIsOpen(false)}>Admins</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

