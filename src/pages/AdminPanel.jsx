import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import PageHeader from "../components/PageHeader";
import "./Panel.css";

import axios from 'axios';

const AdminPanel = () => {
  let axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
  });
  const user = JSON.parse(localStorage.getItem("user")).user;
  const birth = new Date(user.birthDate);
  const [adminDetails, setAdminDetails] = useState({...user, birthDate: `${birth.getFullYear()}-${birth.getMonth() < 10 ? "0" : ""}${birth.getMonth() + 1}-${birth.getDate()}`});

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({
      ...adminDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update the admin details, e.g., sending data to backend
    axiosConfig.post(`admin/${user.personId}`, {email: adminDetails.email, phone: adminDetails.phone, address: adminDetails.address})
      .then(res => {
        if (res?.status === 200) {
          setIsEditing(false);
        }
      })
  };

  return (
    <div className='main-container'>
    <AdminNavbar />
    <div className='header-container'>
      <PageHeader pageTitle="Users" />
    </div>
      <div className="Dasboard-panel-page">
       
      <div className="Dashboardpanel-boxes">
        <div className="profile-box">
          <h2>{adminDetails.name}</h2>
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="edit-icon"
            onClick={() => setIsEditing(true)}
          />
        </div>
        <div className="details-box">
          <div className="details-row">
            <div className="details-label">Name</div>
            <div className="details-value">{adminDetails.name}</div>
          </div>
          <div className="details-row">
            <div className="details-label">Email</div>
            <div className="details-value">{adminDetails.email}</div>
          </div>
          <div className="details-row">
            <div className="details-label">Phone Number</div>
            <div className="details-value">{adminDetails.phone}</div>
          </div>
          <div className="details-row">
            <div className="details-label">Address</div>
            <div className="details-value">{adminDetails.address}</div>
          </div>
          <div className="details-row">
            <div className="details-label">Birthdate</div>
            <div className="details-value">{adminDetails.birthDate}</div>
          </div>
          <div className="details-row">
            <div className="details-label">Gender</div>
            <div className="details-value">{adminDetails.gender}</div>
          </div>
          </div>
        </div>

        {isEditing && (
          <div className="edit-popup">
            <form onSubmit={handleSubmit} className="edit-form">
              <h2>Edit Admin Details</h2>
              <div className="profile-form-group">
                <label>Email</label>
                <input
                className="edit-dashboard-data"
                  type="email"
                  name="email"
                  value={adminDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Phone Number</label>
                <input
                className="edit-dashboard-data"
                  type="tel"
                  name="phone"
                  value={adminDetails.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Address</label>
                <input
                className="edit-dashboard-data"
                  type="text"
                  name="address"
                  value={adminDetails.address}
                  onChange={handleChange}
                />
              </div>
              <button className="adminbutton" type="submit">Save Changes</button>
              <button className="adminbutton" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
