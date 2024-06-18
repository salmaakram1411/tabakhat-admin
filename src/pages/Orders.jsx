import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      chefName: 'John Doe',
      orderItems: 'Pasta, Salad',
      totalPrice: '$30',
      requestedDeliveryTime: '2024-06-18 12:00 PM',
      comment: 'Please deliver ASAP',
      status: 'pending',
    },
    // Add more orders as needed
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="panel-container">
      <AdminNavbar />
      <div className="panel-content">
        <h2>Orders</h2>
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
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

