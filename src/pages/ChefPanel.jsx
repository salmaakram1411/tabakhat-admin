import axios from 'axios';
import React, { useEffect, useState } from "react";
import ChefNavbar from "../components/ChefNavbar";
import PageHeader from "../components/PageHeader";
import "./Panel.css";

const ChefPanel = () => {
  let axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
  });
  const user = JSON.parse(localStorage.getItem("user")).user;
  const birth = new Date(user.birthDate);
  const [chefDetails, setChefDetails] = useState({...user, birthDate: `${birth.getFullYear()}-${birth.getMonth() < 10 ? "0" : ""}${birth.getMonth() + 1}-${birth.getDate()}`});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const response = axiosConfig.get(`chefs/${user?.personId}`)
      .then(
        res => {
          if (res?.data) {
            const data = res.data[0];
            if (data.ID) localStorage.setItem("user", JSON.stringify({user: {...user, chefId: data.ID}}));
            setChefDetails({...chefDetails, description: data.description, social: data.social_media_platforms, cv: data.CV})
          }
        }
      )
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChefDetails({
      ...chefDetails,
      [name]: value,
    });
  };

  const handleSocialChange = (index, e) => {
    const { name, value } = e.target;
    const newSocial = [...chefDetails.social];
    newSocial[index][name] = value;
    setChefDetails({
      ...chefDetails,
      social: newSocial,
    });
  };

  const handleAddSocial = () => {
    setChefDetails({
      ...chefDetails,
      social: [...chefDetails.social, { platform: "", link: "" }],
    });
  };

  const handleRemoveSocial = (index) => {
    const newSocial = chefDetails.social.filter((_, i) => i !== index);
    setChefDetails({
      ...chefDetails,
      social: newSocial,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChefDetails({
          ...chefDetails,
          photo: reader.result, // Update photo with base64 data
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update the chef details, including photo upload
    setIsEditing(false);
  };

  return (
    <div className="main-container">
      <ChefNavbar />
      <div className="header-container">
        <PageHeader pageTitle="Users" />
      </div>
      <div className="dashboard-panel-page">
        <div className="dashboard-panel-boxes">
          <div className="profile-box">
            <h2>{chefDetails.name}</h2>
            {/* <FontAwesomeIcon
              icon={faPencilAlt}
              className="edit-icon"
              onClick={() => setIsEditing(true)}
            /> */}
          </div>
          <div className="details-box">
            <div className="details-row">
              <div className="details-label">Name</div>
              <div className="details-value">{chefDetails.name}</div>
            </div>
            <div className="details-row">
              <div className="details-label">Email</div>
              <div className="details-value">{chefDetails.email}</div>
            </div>
            <div className="details-row">
              <div className="details-label">Phone Number</div>
              <div className="details-value">{chefDetails.phone}</div>
            </div>
            <div className="details-row">
              <div className="details-label">Address</div>
              <div className="details-value">{chefDetails.address}</div>
            </div>
            <div className="details-row">
              <div className="details-label">Birthdate</div>
              <div className="details-value">{chefDetails.birthDate}</div>
            </div>
            <div className="details-row">
              <div className="details-label">Gender</div>
              <div className="details-value">{chefDetails.gender}</div>
            </div>
            <div className="details-row">
              <div className="details-label">CV</div>
              <div className="details-value">
                <a href={`data:image/png;base64, ${chefDetails.cv}`} download target="_blank" rel="noopener noreferrer">
                  View CV
                </a>
              </div>
            </div>
            <div className="details-row">
              <div className="details-label">Social Platforms</div>
              <div className="details-value">
                <p>{chefDetails.social}</p>
              </div>
            </div>
            <div className="details-row">
              <div className="details-label">Description</div>
              <div className="details-value">{chefDetails.description}</div>
            </div>
            {chefDetails.photo && (
              <div className="details-row">
                <div className="details-label">Photo</div>
                <div className="details-value">
                  <img src={chefDetails.photo} alt="Chef" className="profile-photo" />
                </div>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="edit-popup">
            <form onSubmit={handleSubmit} className="edit-form">
              <h2>Edit Chef Details</h2>
              <div className="profile-form-group">
                <label>Name</label>
                <input
                  className="edit-dashboard-data"
                  type="text"
                  name="name"
                  value={chefDetails.name}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Email</label>
                <input
                  className="edit-dashboard-data"
                  type="email"
                  name="email"
                  value={chefDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Phone Number</label>
                <input
                  className="edit-dashboard-data"
                  type="tel"
                  name="phoneNumber"
                  value={chefDetails.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Address</label>
                <input
                  className="edit-dashboard-data"
                  type="text"
                  name="address"
                  value={chefDetails.address}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Birthdate</label>
                <input
                  className="edit-dashboard-data"
                  type="date"
                  name="birthdate"
                  value={chefDetails.birthdate}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Gender</label>
                <select
                  className="edit-dashboard-data"
                  name="gender"
                  value={chefDetails.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="profile-form-group">
                <label>Password</label>
                <input
                  className="edit-dashboard-data"
                  type="password"
                  name="password"
                  value={chefDetails.password}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Confirm Password</label>
                <input
                  className="edit-dashboard-data"
                  type="password"
                  name="confirmPassword"
                  value={chefDetails.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>CV</label>
                <input
                  className="edit-dashboard-data"
                  type="text"
                  name="cv"
                  value={chefDetails.cv}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Description</label>
                <textarea
                  className="edit-dashboard-data"
                  name="description"
                  value={chefDetails.description}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-form-group">
                <label>Social Media Platforms</label>
                {chefDetails.social.map((social, index) => (
                  <div key={index} className="social-form-group">
                    <input
                      className="edit-dashboard-data"
                      type="text"
                      name={`social[${index}].platform`}
                      placeholder="Platform"
                      value={social.platform}
                      onChange={(e) => handleSocialChange(index, e)}
                    />
                    <input
                      className="edit-dashboard-data"
                      type="url"
                      name={`social[${index}].link`}
                      placeholder="Link"
                      value={social.link}
                      onChange={(e) => handleSocialChange(index, e)}
                    />
                    {index > 1 && ( // Ensures at least Facebook and Twitter are always present
                      <button
                        type="button"
                        className="remove-social-button"
                        onClick={() => handleRemoveSocial(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="add-social-button" onClick={handleAddSocial}>
                  Add Social Platform
                </button>
              </div>
              <div className="profile-form-group">
                <label>Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="edit-dashboard-data"
                />
              </div>
              <button className="adminbutton" type="submit">
                Save Changes
              </button>
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

export default ChefPanel;

