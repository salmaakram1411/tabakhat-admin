import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChefPanel from './pages/ChefPanel';
import AdminPanel from './pages/AdminPanel';
import PendingChefs from './pages/PendingChefs';
import ChefsList from './pages/ChefsList';
import Orders from './pages/Orders';
import TotalOrders from './pages/TotalOrders';
import ChefOrders from './pages/ChefOrders';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chef/*" element={<ChefPanel />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/admin/pending-chefs" element={<PendingChefs />} />
        <Route path="/admin/chefs-list" element={<ChefsList />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/total-orders" element={<TotalOrders />} />
        <Route path="/chef/orders" element={<ChefOrders />} />
        <Route path="/admin/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;


























