import React, { useState } from 'react';
import ChefNavbar from '../components/ChefNavbar';
import './ChefMenu.css';
import pancakeImage from '../assets/fish.jpg'; // Example image import

const  ChefMenu = () => {
  // Sample initial data for menu sections and items
  const initialMenu = {
    breakfast: [
      { id: 1, name: 'Pancakes', description: 'Fluffy pancakes served with syrup', price: 8.99, image: pancakeImage },
      { id: 2, name: 'Omelette', description: 'Cheese and vegetable omelette', price: 9.99, image: pancakeImage },
    ],
    lunch: [
      { id: 3, name: 'Caesar Salad', description: 'Fresh greens with Caesar dressing', price: 10.99, image: pancakeImage },
      { id: 4, name: 'Grilled Chicken', description: 'Juicy grilled chicken with sides', price: 12.99, image: pancakeImage },
    ],
    dinner: [
      { id: 5, name: 'Steak', description: 'Tender steak cooked to perfection', price: 19.99, image: pancakeImage },
      { id: 6, name: 'Seafood Pasta', description: 'Rich seafood pasta with garlic bread', price: 17.99, image: pancakeImage },
    ],
    occasions: [
      { id: 7, name: 'Wedding Cake', description: 'Custom-designed wedding cake', price: 199.99, image: pancakeImage },
    ],
    desserts: [
      { id: 8, name: 'Chocolate Mousse', description: 'Decadent chocolate mousse dessert', price: 7.99, image: pancakeImage },
    ],
  };

  const [menu, setMenu] = useState(initialMenu);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation if needed
    // For simplicity, let's assume validation passes
    const updatedMenu = { ...menu };

    if (modalMode === 'add') {
      const newItem = {
        id: menu[Object.keys(menu)[0]].length + 1, // Generate new ID
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
      };
      const section = Object.keys(menu)[0]; // Modify as per your logic
      updatedMenu[section] = [...menu[section], newItem];
    } else if (modalMode === 'edit') {
      const section = Object.keys(menu)[0]; // Modify as per your logic
      updatedMenu[section] = menu[section].map(item =>
        item.id === formData.id ? { ...item, ...formData } : item
      );
    }

    setMenu(updatedMenu);
    closeModal();
  };

  return (
    <div className="menu-page">
      <ChefNavbar />
      <h1>Chef's Menu</h1>

      {/* Render sections and items */}
      {Object.keys(menu).map(section => (
        <div key={section} className="menu-section">
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
              {menu[section].map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <img src={item.image} alt={item.name} className="menu-item-image" />
                  </td>
                  <td>
                    <button onClick={() => openModal('edit', item)}>Edit</button>
                    {/* Add delete functionality if needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-item-btn" onClick={() => openModal('add')}>Add Item</button>
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
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />
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




