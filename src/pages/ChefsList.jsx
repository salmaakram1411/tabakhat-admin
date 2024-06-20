import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import './ChefsList.css';
import PageHeader from "../components/PageHeader";
import ChefMenu from './ChefMenu'; // Import ChefMenu component for menu details

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
      menu: { // Example menu for Jane Doe
        breakfast: [
          { id: 1, name: 'Pancakes', description: 'Fluffy pancakes served with syrup', price: 8.99, image: '/path/to/pancakes.jpg' },
          { id: 2, name: 'Omelette', description: 'Cheese and vegetable omelette', price: 9.99, image: '/path/to/omelette.jpg' },
        ],
        lunch: [
          { id: 1, name: 'Caesar Salad', description: 'Fresh greens with Caesar dressing', price: 10.99, image: '/path/to/caesar-salad.jpg' },
          { id: 2, name: 'Grilled Chicken', description: 'Juicy grilled chicken with sides', price: 12.99, image: '/path/to/grilled-chicken.jpg' },
        ],
        dinner: [
          { id: 1, name: 'Steak', description: 'Tender steak cooked to perfection', price: 19.99, image: '/path/to/steak.jpg' },
          { id: 2, name: 'Seafood Pasta', description: 'Rich seafood pasta with garlic bread', price: 17.99, image: '/path/to/seafood-pasta.jpg' },
        ],
        occasions: [
          { id: 1, name: 'Wedding Cake', description: 'Custom-designed wedding cake', price: 199.99, image: '/path/to/wedding-cake.jpg' },
        ],
        desserts: [
          { id: 1, name: 'Chocolate Mousse', description: 'Decadent chocolate mousse dessert', price: 7.99, image: '/path/to/chocolate-mousse.jpg' },
        ],
      },
    },
    // Add more chefs as needed
  ]);

  const [selectedChef, setSelectedChef] = useState(null); // State to track selected chef for viewing/editing menu

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this chef?')) {
      alert(`Removed chef with ID: ${id}`);
      // Remove chef from list
      setChefs(chefs.filter((chef) => chef.id !== id));
    }
  };

  const handleBlock = (id) => {
    if (window.confirm('Are you sure you want to block this chef?')) {
      alert(`Blocked chef with ID: ${id}`);
      // Block chef logic here
    }
  };

  const handleViewMenu = (chef) => {
    setSelectedChef(chef);
  };

  const handleCloseMenu = () => {
    setSelectedChef(null);
  };

  return (
    <div className='main-container'>
      <AdminNavbar />
      <div className='header-container'>
        <PageHeader pageTitle="Users" />
      </div>
      <div className="cheflist-container">
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
                <td>
                  <a href={chef.cv} target="_blank" rel="noopener noreferrer">
                    View CV
                  </a>
                </td>
                <td>
                  <a href={chef.social.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                  ,{' '}
                  <a href={chef.social.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </td>
                <td>{chef.subscriptionType}</td>
                <td>
                  <button onClick={() => handleRemove(chef.id)} className='cheflist-button'>Remove</button>
                  <button onClick={() => handleBlock(chef.id)} className='cheflist-button'>Block</button>
                  <button onClick={() => handleViewMenu(chef)} className='cheflist-button'>Menu</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal or popup for viewing/editing menu */}
      {selectedChef && (
        <div className="menu-popup">
          <div className="menu-popup-content">
            <span className="close" onClick={handleCloseMenu}>
              &times;
            </span>
            <h2>{selectedChef.name}'s Menu</h2>
            <ChefMenu chef={selectedChef} />
          </div>
        </div>
      )}
    </div>
    
  );
};

export default ChefsList;
