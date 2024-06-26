import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import PageHeader from '../components/PageHeader';
import './Users.css'; // Import your CSS file for styling

const Users = () => {
  let axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
  });
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '456 Elm St, Somewhere, USA',
      gender: 'Male',
      birthdate: '1995-05-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      address: '789 Oak Ave, Anytown, USA',
      gender: 'Female',
      birthdate: '1990-12-31',
    },
    // Add more users as needed
  ]);

  function updateUsers() {
    const response = axiosConfig.get("customer")
      .then(
        res => {
          if (res?.data) {
            const data = res.data.map(item => {
              item.name = `${item.first_name} ${item.last_name}`;
              item.phone = item.phone_number;
              item.birthdate = item.birth_date.split("T")[0];
              item.id = item.ID;
              return item
            })
            setUsers(data);
          }
        }
      )
  }

  useEffect(() => {
    updateUsers();
  }, [])

  const handleRemoveUser = (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      axiosConfig.delete(`customer/${id}`).then(
        res => {
          alert("User has been removed");
          updateUsers();
        }
      )
    }
  };

  const handleBlockUser = (id) => {
    if (window.confirm('Are you sure you want to block this user?')) {
      alert(`Blocked user with ID: ${id}`);
      // Logic to block user here
    }
  };

  return (
    <div className='main-container'>
      <AdminNavbar />
      <div className='header-container'>
        <PageHeader pageTitle="Users" />
      </div>
      <div className="users-container">
        <h2>Users List</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Birthdate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.gender}</td>
                <td>{user.birthdate}</td>
                <td>
                  <button className="users-button" onClick={() => handleRemoveUser(user.id)}>Remove</button>
                  <button className="users-button" onClick={() => handleBlockUser(user.id)}>Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;


