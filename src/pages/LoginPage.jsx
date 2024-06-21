import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../services/http';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errors,  setErrors] = useState("");
  console.log({errors})

  const handleLogin = async () => {
    try {
      const response = await axiosConfig.post('auth/admin-login', {email, password});
      if (response.status === 200) {
        const token = response.data.token;
        const user = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        if (user.user.role === "Chef") {
          navigate('/chef');
        } else if (user.user.role === "Admin") {
          navigate('/admin/home');
        } else {
          alert('Invalid credentials!');
        }
      }
    } catch (error) {
      setErrors({invalidCredentials: "Invalid credentials"});
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-page'>
    <div className="login-container">
      <h2>Login</h2>
      {errors ? <p>Invalid Credentials</p> : ""}
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









