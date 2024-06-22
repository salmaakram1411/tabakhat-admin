import axios from 'axios';
import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import PageHeader from "../components/PageHeader";
import './AddAdmin.css';

const AddAdmin = () => {
  let axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
  });
  const [adminDetails, setAdminDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    gender: '',
    birthdate: '',
    role: "ADMIN"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({
      ...adminDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission, e.g., sending data to backend
    axiosConfig.post("auth/register", {...adminDetails, phone: adminDetails.phoneNumber, birthDate: adminDetails.birthdate})
      .then(
        res => {
          alert(res.data.msg || "Admin created successfully")
        }
      ).catch(err => {
        alert("User already exists")
      })
  };

  return (
    <div className='main-container'>
    <AdminNavbar />
    <div className='header-container'>
      <PageHeader pageTitle="Users" />
    </div>
    <div className="add-admin-page">
       
      <h2>Add New Admin</h2>
      <form onSubmit={handleSubmit} className="add-admin-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={adminDetails.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={adminDetails.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={adminDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={adminDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={adminDetails.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={adminDetails.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={adminDetails.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Birthdate</label>
          <input
            type="date"
            name="birthdate"
            value={adminDetails.birthdate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='add-admin-button'>Add Admin</button>
      </form>
    </div>
    </div>
  );
};

export default AddAdmin;
