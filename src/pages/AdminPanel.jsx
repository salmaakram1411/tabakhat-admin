import React, { useState } from "react";
import "./Panel.css";
import AdminNavbar from "../components/AdminNavbar";
import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const AdminPanel = () => {
  const [adminDetails, setAdminDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    birthdate: "1985-05-15",
    gender: "Male",
    password: "",
    confirmPassword: "",
  });

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
    setIsEditing(false);
  };

  return (
    <div className="main-container">
      <AdminNavbar />
      <div className="admin-panel-page">
        <PageHeader />
      <div className="adminpanel-boxes">
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
            <div className="details-value">{adminDetails.phoneNumber}</div>
          </div>
          <div className="details-row">
            <div className="details-label">Address</div>
            <div className="details-value">{adminDetails.address}</div>
          </div>
          <div className="details-row">
            <div className="details-label">Birthdate</div>
            <div className="details-value">{adminDetails.birthdate}</div>
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
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={adminDetails.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={adminDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={adminDetails.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={adminDetails.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={adminDetails.birthdate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={adminDetails.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={adminDetails.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={adminDetails.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>
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
