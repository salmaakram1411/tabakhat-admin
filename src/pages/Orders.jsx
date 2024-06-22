import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import PageHeader from '../components/PageHeader';
import './Orders.css';

const Orders = () => {
  let axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
  });
  const [orders, setOrders] = useState([]);

  function updateData() {
    const response = axiosConfig.get("admin-orders")
      .then(
        res => {
          if (res?.data) {
            const data = res.data;
            setOrders(data.map(item => {
              item = {
                chefName: `${item.chef_first_name} ${item.chef_last_name}`,
                orderItems: `${item.dishes}, ...`,
                totalPrice: item.total_cost,
                requestedDeliveryTime: item.delivery_time.split("T")[0],
                comment: item.comment_content,
                status: item.status,
                id: item.OrderID
              };
              return item
            }))
          }
        }
      )
  }

  useEffect(() => {
    updateData();
  }, [])

  const handleStatusChange = (id, newStatus) => {
    axiosConfig.put(`admin-orders/${id}`, {status: newStatus})
      .then(
        res => {
          alert("Order status changed");
          updateData();
        }
      );
  };

  return (
    <div className='main-container'>
    <AdminNavbar />
    <div className='header-container'>
      <PageHeader pageTitle="Users" />
    </div>
    
      <div className="all-orders">
        <h2>Orders</h2>
        <table className="all-orders-table">
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

