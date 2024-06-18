import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [totalChefsCount, setTotalChefsCount] = useState(0);
  const [pendingChefsCount, setPendingChefsCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);

  useEffect(() => {
    // Simulating fetching data from respective pages or APIs
    // Replace with actual fetch logic as per your application structure

    // Fetch number of pending orders
    // Example: fetch('/api/orders/pending/count')
    //   .then(response => response.json())
    //   .then(data => setPendingOrdersCount(data.count))
    const fetchPendingOrdersCount = () => {
      // Simulated data for demo
      const count = 10; // Replace with actual count fetched from Orders page
      setPendingOrdersCount(count);
    };

    // Fetch number of completed orders
    // Example: fetch('/api/orders/completed/count')
    //   .then(response => response.json())
    //   .then(data => setCompletedOrdersCount(data.count))
    const fetchCompletedOrdersCount = () => {
      // Simulated data for demo
      const count = 25; // Replace with actual count fetched from TotalOrders page
      setCompletedOrdersCount(count);
    };

    // Fetch number of total chefs
    // Example: fetch('/api/chefs/total/count')
    //   .then(response => response.json())
    //   .then(data => setTotalChefsCount(data.count))
    const fetchTotalChefsCount = () => {
      // Simulated data for demo
      const count = 50; // Replace with actual count fetched from ChefsList page
      setTotalChefsCount(count);
    };

    // Fetch number of pending chefs
    // Example: fetch('/api/chefs/pending/count')
    //   .then(response => response.json())
    //   .then(data => setPendingChefsCount(data.count))
    const fetchPendingChefsCount = () => {
      // Simulated data for demo
      const count = 5; // Replace with actual count fetched from PendingChefs page
      setPendingChefsCount(count);
    };

    // Fetch number of total users
    // Example: fetch('/api/users/total/count')
    //   .then(response => response.json())
    //   .then(data => setTotalUsersCount(data.count))
    const fetchTotalUsersCount = () => {
      // Simulated data for demo
      const count = 100; // Replace with actual count fetched from Users page
      setTotalUsersCount(count);
    };

    // Fetch all counts on component mount
    fetchPendingOrdersCount();
    fetchCompletedOrdersCount();
    fetchTotalChefsCount();
    fetchPendingChefsCount();
    fetchTotalUsersCount();
  }, []);

  return (
    <div className="home-page">
        <AdminNavbar />
      <div className="box">
        <div className="box-content">
          <div className="box-number">{pendingOrdersCount}</div>
          <div className="box-text">Total Pending</div>
          <Link to="/admin/orders" className="box-button">See Orders</Link>
        </div>
      </div>
      <div className="box">
        <div className="box-content">
          <div className="box-number">{completedOrdersCount}</div>
          <div className="box-text">Total Completes</div>
          <Link to="/admin/total-orders" className="box-button">See Orders</Link>
        </div>
      </div>
      <div className="box">
        <div className="box-content">
          <div className="box-number">{totalChefsCount}</div>
          <div className="box-text">Total Chefs</div>
          <Link to="/admin/chefs-list" className="box-button">See Chefs</Link>
        </div>
      </div>
      <div className="box">
        <div className="box-content">
          <div className="box-number">{pendingChefsCount}</div>
          <div className="box-text">Total Pending</div>
          <Link to="/admin/pending-chefs" className="box-button">See Pending Chefs</Link>
        </div>
      </div>
      <div className="box">
        <div className="box-content">
          <div className="box-number">{totalUsersCount}</div>
          <div className="box-text">Total Users</div>
          <Link to="/admin/users" className="box-button">See Users</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
