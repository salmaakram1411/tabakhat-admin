import axios from 'axios';
import React, { useEffect, useState } from 'react';
import pancakeImage from '../assets/fish.jpg'; // Example image import
import ChefNavbar from '../components/ChefNavbar';
import PageHeader from "../components/PageHeader";
import './ChefMenu.css';

const ChefMenu = ({chef}) => {
  let axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
  });
  const chefId = JSON.parse(localStorage.getItem("user"))?.user?.chefId;
  // Sample initial data for menu sections and items
  const initialMenu = {};

  const [selectedSection, setSelectedSection] = useState(null);
  const [image, setImage] = useState("");
  const [data, setData] = useState({});
  const [menu, setMenu] = useState(initialMenu);
  const [showModal, setShowModal] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [sectionData, setSectionData] = useState({name: ""});
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: pancakeImage, // Default image for now
  });

  const openModal = (mode, item) => {
    if (mode === 'edit') {
      setFormData({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
      });
    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
        price: '',
        image: pancakeImage, // Reset image to default for new item
      });
      console.log({data, item})
      const selected = data?.find(sec => sec.role ? (sec.role === item) : (sec.section_role === item));
      setSelectedSection(selected);
    }
    setModalMode(mode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode('add');
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      image: pancakeImage, // Reset image to default
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    setSectionData({
      ...sectionData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMenu = { ...menu };

    if (modalMode === 'add') {
      const newItem = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        // image: formData.image,
      };
      const section = Object.keys(menu)[0]; // Modify as per your logic
      updatedMenu[section] = [...menu[section], newItem];
      axiosConfig.post(`dishes`, {...newItem, sectionId: (selectedSection.sectionId || selectedSection.ID)})
      .then(
        res => {
          if (res?.data?.insertId) {
            const imageFormData = new FormData();
            imageFormData.append("image", image);
            axiosConfig.post(`dish-image/${res.data.insertId}`, imageFormData).then(
              res => {
                updateData();
              }
            )
          }
        }
      )
    } else if (modalMode === 'edit') {
      const section = Object.keys(menu)[0]; // Modify as per your logic
      updatedMenu[section] = menu[section].map(item =>
        item.id === formData.id ? { ...item, ...formData } : item
      );
      axiosConfig.put(`dishes/${formData.id}`, {...formData})
      .then(
        res => {
          if (res?.data) {
            const imageFormData = new FormData();
            imageFormData.append("image", image);
            axiosConfig.post(`dish-image/${formData.id}`, imageFormData).then(
              res => {
                updateData();
              }
            )
          }
        }
      )
    }

    setMenu(updatedMenu);
    closeModal();
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  }

  const updateData = () => {
    if (chef || chefId) {

      axiosConfig.get("sections-dishes" + "/" + (chef?.id ?? chefId))
      .then(
        res => {
          if (res?.data?.length) {
            const data = res.data;
            setData(data);
            setMenu({});
            const menu = {};
            console.log({data})
            const sections = data.map(item => {
              return {
                role: item.section_role,
                id: item.sectionId
              }
            })
            for (let sec of sections) {
              menu[sec.role] = data.filter(dish => {
                return dish.sectionId === sec.id
              }).map(item => {
                return {
                  ...item,
                  id: item.ID
                }
              }).filter(item => item.id)
            }
            setMenu(menu)
          } else {
            axiosConfig.get(`sections/${chefId}`)
              .then(
                res => {
                  if (res?.data?.length) {
                    const data = res.data;
                    setData(data);
                    const menu = {};
                    setMenu({});
                    const sections = data.map(item => {
                      return {
                        role: item.role,
                        id: item.ID
                      }
                    });
                    for (let sec of sections) {
                      menu[sec.role] = []
                    }
                    setMenu(menu);
                    console.log({menu})
                  }
                }
              )
          }
        }
      )
    }
  }

  useEffect(() => {
    updateData();
  }, []);

  const addSection = () => {
    setShowSection(true);
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    axiosConfig.post(`sections`, {role: sectionData.name})
      .then(
        res => {
          setTimeout(() => {
            updateData();
            alert("Section has been created");
          }, 10);
        }
      )
  }

  const handleRemove = (section, id) => {
    // const updatedMenu = {
    //   ...menu,
    //   [section]: menu[section].filter(item => item.id !== id)
    // };
    // setMenu(updatedMenu);
    axiosConfig.delete(`dishes/${id}`)
      .then(
        res => {updateData()}
      )
  };

  return (
    <div className='main-container'>
    <ChefNavbar />
    <div className='header-container'>
      <PageHeader pageTitle="Users" />
    </div>
      <h1>Chef's Menu</h1>
      <button className="add-item-btn" onClick={addSection}>Add Section</button>
      {showSection && <form onSubmit={handleSectionSubmit}>
              <div className="form-group">
                <label>Section name</label>
                <input type="text" name="name" value={sectionData.name} onChange={handleSectionChange} required />
              </div>
              <button type="submit" className='add-item-btn'>Add</button>
        </form>}

      {/* Render sections and items */}
      {Object.keys(menu).map((section, i) => (
        <div key={i} className="menu-section">
          <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          <table className="menu-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu[section].map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${`${(+item.price).toFixed(2)}`}</td>
                  <td>
                    <img src={`data:image/png;base64, ${item.image}`} alt={item.name} className="menu-item-image" />
                  </td>
                  <td>
                    <button className='chef-editRemove' onClick={() => openModal('edit', item)}>Edit</button>
                    <button className='chef-editRemove' onClick={() => handleRemove(section, item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-item-btn" onClick={() => openModal('add', section)}>Add Item</button>
        </div>
      ))}

      {/* Modal for adding/editing items */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{modalMode === 'add' ? 'Add Item' : 'Edit Item'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
              </div>
              {/* Add image upload functionality */}
              {/* <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />
              </div> */}
              <div className="form-group">
              <label htmlFor="receipt">Image</label>
              <input 
                type="file" 
                id="receipt" 
                name="receipt" 
                className="checkout-input" 
                accept="image/*" 
                onChange={handleImage} 
                required 
              />
            </div>
              <button type="submit">{modalMode === 'add' ? 'Add' : 'Save Changes'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefMenu;





