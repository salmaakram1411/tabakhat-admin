import React from 'react';
import ChefNavbar from '../components/ChefNavbar';
import './Panel.css';

const ChefPanel = () => {
  return (
    <div className="panel-container">
      <ChefNavbar />
      <div className="panel-content">
        <h2>Chef Panel</h2>
        <p>Welcome to the Chef Panel!</p>
      </div>
    </div>
  );
};

export default ChefPanel;









