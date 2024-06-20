import React from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you are using React Router

const PageHeader = ({ pageTitle }) => {
  const location = useLocation();

  const headerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70px',
    padding: '0 20px',
    backgroundColor: '#f0f0f0',  // Hexadecimal notation for light gray
    borderBottom: '1px solid #ccc',
    position: 'relative',
    
    width: '100%',
    boxSizing: 'border-box'
  };

  const pathStyle = {
    fontSize: '25px',
    color: '#e01e37',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  };

  return (
    <div style={headerContainerStyle}>
      <p style={pathStyle}>{location.pathname}</p>
    </div>
  );
};

export default PageHeader;
