import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-primary">WeFood</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="text-gray-700 hover:text-primary">搜索</Link>
            <Link to="/publish" className="text-gray-700 hover:text-primary">发布</Link>
            <Link to="/login" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600">
              登录
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/search" 
                className="text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                搜索
              </Link>
              <Link 
                to="/publish" 
                className="text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                发布
              </Link>
              <Link 
                to="/login" 
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 inline-block w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                登录
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;