import React from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you are using React Router

const PageHeader = ({ pageTitle }) => {
  const location = useLocation();

  const headerContainerStyle = {
    display: 'flex',
    flex: '1',
    padding: '30px',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0'  // Hexadecimal notation for light gray
  };
  const pathStyle = {
    fontSize: '25px',
    color: '#e01e37',
    marginTop: '10px',
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
