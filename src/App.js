import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';
import BusinessDetailPage from './components/pages/BusinessDetailPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import PublishPage from './components/pages/PublishPage';

function App() {
  return (
    <Router basename="/weFoodYellowPage">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="business/:id" element={<BusinessDetailPage />} />
          <Route path="publish" element={<PublishPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;