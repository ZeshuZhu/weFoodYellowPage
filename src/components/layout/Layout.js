import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  // Ensure header resets on unmount
  useEffect(() => {
    return () => {
      const header = document.querySelector('header');
      if (header) {
        header.style.width = '100%';
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header in its own container */}
      <Header />
      
      {/* Main content in a separate container */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;