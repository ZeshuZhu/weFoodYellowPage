// src/components/common/BusinessDetailPanel.js
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const BusinessDetailPanel = ({ 
  business, 
  isOpen, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState('basic'); // basic, company, services
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const panelRef = useRef(null);
  
  // Check if we're on a mobile device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle escape key to close panel
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);
  
  // Apply body scrolling control on mobile only
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isMobile]);

  if (!business) {
    return null;
  }

  // Extract service tags if available
  const services = business.tags ? business.tags.split(',').filter(tag => tag.trim()) : [];

  // Mobile view uses a full overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile backdrop overlay */}
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="modal-backdrop"
          unmountOnExit
        >
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          ></div>
        </CSSTransition>
        
        {/* Mobile slide-up panel */}
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="slide-up"
          unmountOnExit
          nodeRef={panelRef}
        >
          <div 
            ref={panelRef}
            className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden transform transition-transform duration-300"
            style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
          >
            {/* Panel content */}
            {renderPanelContent()}
          </div>
        </CSSTransition>
      </>
    );
  }
  
  // Desktop view uses a side panel that resizes the main content
  return (
    <div 
      ref={panelRef}
      className={`fixed top-0 right-0 h-full bg-white shadow-xl z-30 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'w-1/3' : 'w-0' // Changed to w-1/3 (33.3% width)
      }`}
    >
      {isOpen && renderPanelContent()}
    </div>
  );
  
  // Helper function to render panel content (used in both mobile and desktop)
  function renderPanelContent() {
    return (
      <>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-10 bg-white rounded-full p-2 shadow-md"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Save/Bookmark button */}
        <button
          className="absolute right-4 top-4 z-10 bg-black bg-opacity-70 rounded p-2"
          aria-label="Save business"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        
        {/* Business Image */}
        <div className="relative w-full h-64 md:h-80 bg-gray-200">
          <img 
            src={business.imageUrl} 
            alt={business.name}
            className="w-full h-full object-cover"
          />
          
          {/* WEFOOD Recommendation Badge */}
          {business.recommended && (
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded px-2 py-1 text-sm">
              <span className="mr-1">👍</span>WEFOOD推荐
            </div>
          )}
        </div>
        
        {/* Content Container */}
        <div className="px-4 pt-4 pb-24 overflow-y-auto h-[calc(100%-16rem)] md:h-[calc(100%-20rem)]">
          {/* Rating and Review Count */}
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star} 
                  className={`h-5 w-5 ${
                    star <= Math.floor(business.rating || 4) 
                      ? 'text-yellow-400' 
                      : star <= (business.rating || 4) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm">{business.ratingCount || 23}</span>
            
            <button className="ml-auto text-gray-600 text-sm">
              撰写评论
            </button>
          </div>
          
          {/* Business Name */}
          <h1 className="text-2xl font-semibold mb-1">{business.name}</h1>
          {business.contact && (
            <h2 className="text-lg text-gray-700 mb-2">联系人: {business.contact}</h2>
          )}
          
          {/* Location */}
          {business.addresses && (
            <div className="flex items-center text-gray-600 text-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{business.addresses}</span>
            </div>
          )}

          {/* Business Category */}
          <h3 className="text-xl font-medium mb-2">{business.keyword || '装修/建筑'}</h3>
          
          {/* Business Description */}
          <p className="text-gray-600 mb-6 whitespace-pre-line">
            {business.description || ''}
          </p>
          
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                className={`py-2 text-sm font-medium ${
                  activeTab === 'basic'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('basic')}
              >
                基本信息
              </button>
              <button
                className={`py-2 text-sm font-medium ${
                  activeTab === 'company'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('company')}
              >
                公司详情
              </button>
              <button
                className={`py-2 text-sm font-medium ${
                  activeTab === 'services'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('services')}
              >
                服务项目
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === 'basic' && (
              <div className="space-y-4">
                {/* Address */}
                {business.addresses && (
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-800">{business.addresses}</p>
                    </div>
                  </div>
                )}
                
                {/* Phone */}
                {business.phone && (
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-gray-800">{business.phone}</p>
                    </div>
                  </div>
                )}
                
                {/* Fax */}
                {business.fax && (
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-gray-800">{business.fax}</p>
                    </div>
                  </div>
                )}
                
                {/* Website */}
                {(business.website || business.url) && (
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <a 
                        href={business.website || business.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {business.website || business.url}
                      </a>
                    </div>
                  </div>
                )}
                
                {/* Contact Person */}
                {business.contact && (
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="text-gray-800">{business.contact}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'company' && (
              <div>
                <p className="text-gray-700 whitespace-pre-line">
                  {business.description || '暂无公司详情信息'}
                </p>
              </div>
            )}
            
            {activeTab === 'services' && (
              <div>
                {services.length > 0 ? (
                  <ul className="space-y-2">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-0.5 text-blue-500">•</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5 text-blue-500">•</span>
                      <span>{business.keyword || '装修服务'}</span>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          
          {/* Suggest Edit Link */}
          <div className="text-center mt-8">
            <button className="inline-flex items-center text-gray-600 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Suggest an edit
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default BusinessDetailPanel;