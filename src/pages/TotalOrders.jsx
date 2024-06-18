import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import './Orders.css';

const TotalOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const completedOrders = [
      {
        id: 1,
        chefName: 'John Doe',
        orderItems: 'Pasta, Salad',
        totalPrice: '$30',
        requestedDeliveryTime: '2024-06-18 12:00 PM',
        comment: 'Please deliver ASAP',
        status: 'completed',
      },
      // Add more completed orders as needed
    ];
    setOrders(completedOrders.filter(order => order.status === 'completed'));
  }, []);

  return (
    <div className="panel-container">
      <AdminNavbar />
      <div className="panel-content">
        <h2>Total Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Chef Name</th>
              <th>Order Items</th>
              <th>Total Price</th>
              <th>Requested Delivery Time</th>
              <th>Comment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.chefName}</td>
                <td>{order.orderItems}</td>
                <td>{order.totalPrice}</td>
                <td>{order.requestedDeliveryTime}</td>
                <td>{order.comment}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalOrders;

