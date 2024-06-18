import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import './ChefsList.css';

const ChefsList = () => {
  const [chefs, setChefs] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987-654-3210',
      address: '123 Main St, Anytown, USA',
      gender: 'Female',
      birthdate: '1990-01-01',
      picture: '/path/to/picture.jpg',
      description: 'Experienced chef specializing in Italian cuisine.',
      cv: '/path/to/cv.pdf',
      social: {
        facebook: 'https://facebook.com/jane',
        twitter: 'https://twitter.com/jane',
      },
      subscriptionType: 'Premium',
    },
    // Add more chefs as needed
  ]);

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this chef?')) {
      alert(`Removed chef with ID: ${id}`);
      // Remove chef from list
      setChefs(chefs.filter(chef => chef.id !== id));
    }
  };

  const handleBlock = (id) => {
    if (window.confirm('Are you sure you want to block this chef?')) {
      alert(`Blocked chef with ID: ${id}`);
      // Block chef logic here
    }
  };

  return (
    <div className="panel-container">
      <AdminNavbar />
      <div className="panel-content">
        <h2>Chefs List</h2>
        <table className="chefs-list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Birthdate</th>
              <th>Picture</th>
              <th>Description</th>
              <th>CV</th>
              <th>Social Platforms</th>
              <th>Subscription Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {chefs.map((chef) => (
              <tr key={chef.id}>
                <td>{chef.name}</td>
                <td>{chef.email}</td>
                <td>{chef.phone}</td>
                <td>{chef.address}</td>
                <td>{chef.gender}</td>
                <td>{chef.birthdate}</td>
                <td>
                  <img src={chef.picture} alt={chef.name} className="chef-picture" />
                </td>
                <td>{chef.description}</td>
                <td><a href={chef.cv} target="_blank" rel="noopener noreferrer">View CV</a></td>
                <td>
                  <a href={chef.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>,{' '}
                  <a href={chef.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                </td>
                <td>{chef.subscriptionType}</td>
                <td>
                  <button onClick={() => handleRemove(chef.id)}>Remove</button>
                  <button onClick={() => handleBlock(chef.id)}>Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChefsList;
