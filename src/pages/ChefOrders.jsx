import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChefNavbar from '../components/ChefNavbar';
import PageHeader from "../components/PageHeader";
import './Orders.css';

const ChefOrders = () => {
  let axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
  });
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))?.user;

  useEffect(() => {
    axiosConfig.get(`chef-orders/${user.chefId}`)
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
  }, []);

  return (
    <div className='main-container'>
    <ChefNavbar />
    <div className='header-container'>
      <PageHeader pageTitle="Users" />
    </div>
      <div className="all-orders">
        <h2>Chef Orders</h2>
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
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChefOrders;

