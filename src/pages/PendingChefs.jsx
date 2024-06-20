import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import PageHeader from "../components/PageHeader";

import './PendingChefs.css';

const PendingChefs = () => {
  const [chefs, setChefs] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      cv: '/path/to/cv.pdf',
      social: {
        facebook: 'https://facebook.com/john',
        twitter: 'https://twitter.com/john',
      },
      subscriptionType: 'Ordinary',
      paymentReceipt: '/path/to/receipt.pdf',
    },
    // Add more chefs as needed
  ]);

  const handleAccept = (id) => {
    // Logic to accept the chef
    alert(`Accepted chef with ID: ${id}`);
    // Remove chef from pending list
    setChefs(chefs.filter(chef => chef.id !== id));
  };

  const handleReject = (id) => {
    // Logic to reject the chef
    alert(`Rejected chef with ID: ${id}`);
    // Remove chef from pending list
    setChefs(chefs.filter(chef => chef.id !== id));
  };

  return (
  <div className='main-container'>
    <AdminNavbar />
    <div className='header-container'>
      <PageHeader pageTitle="Users" />
      </div>
      <div className="pending-chef">
        <h2>Pending Chefs</h2>
        <table className="pending-chefs-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>CV</th>
              <th>Social Platforms</th>
              <th>Payment Receipt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {chefs.map((chef) => (
              <tr key={chef.id}>
                <td>{chef.name}</td>
                <td>{chef.email}</td>
                <td>{chef.phone}</td>
                <td><a href={chef.cv} target="_blank" rel="noopener noreferrer">View CV</a></td>
                <td>
                  <a href={chef.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>,{' '}
                  <a href={chef.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                </td>
               
                <td><a href={chef.paymentReceipt} target="_blank" rel="noopener noreferrer">View Receipt</a></td>
                <td>
                  <button onClick={() => handleAccept(chef.id)}>Accept</button>
                  <button onClick={() => handleReject(chef.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   
   
  );
};

export default PendingChefs;
