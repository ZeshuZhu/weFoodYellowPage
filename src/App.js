// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import PublishPage from './components/pages/PublishPage';
import LandingPage from './components/pages/LandingPage';

function App() {
  return (
    <Router basename="/weFoodYellowPage">
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Main application routes with Layout */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="publish" element={<PublishPage />} />
        </Route>
        
        {/* Redirect any other paths to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;