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

/**
 * 主要应用程序组件，负责路由管理
 * 
 * 使用React Router在不同页面之间导航
 * 
 * Routes include:
 * - Landing page (default route)
 * - Authentication routes (login, register)
 * - Main application routes with shared Layout component
 * 
 * 注意：如果部署到子目录，需要更新Router中的basename属性
 */
function App() {
  return (
    <Router basename="/weFoodYellowPage">
      <Routes>
        {/* 登陆页面作为默认route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* 认证route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* 带有Layout布局的主应用route */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="publish" element={<PublishPage />} />
        </Route>
        
        {/* 将任何其他路径重定向到登陆页面 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;