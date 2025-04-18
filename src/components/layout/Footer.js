import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-darkGray text-white mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">WeFood Yellow Page</h3>
            <p className="text-sm">连接餐厅与优质供应商</p>
          </div>
          <div>
            <p className="text-sm">&copy; {new Date().getFullYear()} WeFood. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;