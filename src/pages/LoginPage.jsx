import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'chef' && password === '000') {
      navigate('/chef');
    } else if (email === 'admin' && password === '000') {
      navigate('/admin/home');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className='login-page'>
    <div className="login-container">
      <h2>Login</h2>
      <input 
        className='dashboardlogin'
        type="text" 
        placeholder="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
       className='dashboardlogin'
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin} className='dashboard-login-button'>Login</button>
    </div>
    </div>
  );
};

export default LoginPage;









