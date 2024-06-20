import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import "./HomePage.css";

const HomePage = () => {
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [totalChefsCount, setTotalChefsCount] = useState(0);
  const [pendingChefsCount, setPendingChefsCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);

  useEffect(() => {
    const fetchPendingOrdersCount = () => {
      const count = 10;
      setPendingOrdersCount(count);
    };

    const fetchCompletedOrdersCount = () => {
      const count = 25;
      setCompletedOrdersCount(count);
    };

    const fetchTotalChefsCount = () => {
      const count = 50;
      setTotalChefsCount(count);
    };

    const fetchPendingChefsCount = () => {
      const count = 5;
      setPendingChefsCount(count);
    };

    const fetchTotalUsersCount = () => {
      const count = 100;
      setTotalUsersCount(count);
    };

    fetchPendingOrdersCount();
    fetchCompletedOrdersCount();
    fetchTotalChefsCount();
    fetchPendingChefsCount();
    fetchTotalUsersCount();
  }, []);

  return (
    <div className='main-container'>
      <AdminNavbar />
      <div className='header-container'>
        <PageHeader pageTitle="Users" />
      </div>
      <div className="home-page">
        <div className="boxs-container">
          <div className="box">
            <div className="box-content">
              <div className="box-number">{pendingOrdersCount}</div>
              <div className="box-text">Total Pending</div>
              <Link to="/admin/orders" className="box-button">
                See Orders
              </Link>
            </div>
          </div>
          <div className="box">
            <div className="box-content">
              <div className="box-number">{completedOrdersCount}</div>
              <div className="box-text">Total Completes</div>
              <Link to="/admin/total-orders" className="box-button">
                See Orders
              </Link>
            </div>
          </div>
          <div className="box">
            <div className="box-content">
              <div className="box-number">{totalChefsCount}</div>
              <div className="box-text">Total Chefs</div>
              <Link to="/admin/chefs-list" className="box-button">
                See Chefs
              </Link>
            </div>
          </div>
          <div className="box">
            <div className="box-content">
              <div className="box-number">{pendingChefsCount}</div>
              <div className="box-text">Total Pending</div>
              <Link to="/admin/pending-chefs" className="box-button">
                See Pending Chefs
              </Link>
            </div>
          </div>
          <div className="box">
            <div className="box-content">
              <div className="box-number">{totalUsersCount}</div>
              <div className="box-text">Total Users</div>
              <Link to="/admin/users" className="box-button">
                See Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
