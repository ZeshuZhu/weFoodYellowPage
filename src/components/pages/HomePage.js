// src/components/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { loadBusinessData } from '../../utils/data';
import SearchBar from '../common/SearchBar';
import CategorySelector from '../common/CategorySelector';
import FilterSort from '../common/FilterSort';
import BusinessCard from '../common/BusinessCard';
import BusinessDetailPanel from '../common/BusinessDetailPanel';

const HomePage = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentView, setCurrentView] = useState('grid');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);
  
  // State for business detail panel
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadBusinessData();
        // Get up to 8 businesses to show
        setFeaturedBusinesses(data.slice(0, 8));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle window resize for responsive detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 480);
      
      // 768px is Tailwind's md breakpoint
      if (width >= 768 && currentView === 'list') {
        setCurrentView('grid');
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentView]);

  // Get appropriate placeholder image based on view mode and screen size
  const getPlaceholderImage = () => {
    if (currentView === 'grid') {
      // Grid view - square image (640x640)
      return "https://placehold.co/640x640";
    } else {
      // List view
      if (isSmallMobile) {
        // Small mobile - 16:9 aspect ratio (960x540)
        return "https://placehold.co/960x540";
      } else {
        // Desktop/tablet - 4:3 aspect ratio (384x288)
        return "https://placehold.co/384x288";
      }
    }
  };

  // Function to open business detail panel
  const handleShowBusinessDetail = (business) => {
    // Prevent reopening the same business
    if (isDetailOpen && selectedBusiness && selectedBusiness.id === business.id) {
      return;
    }
    
    const businessDetail = featuredBusinesses.find(b => b.id === business.id);
    if (businessDetail) {
      // Close panel first if it's already open
      if (isDetailOpen) {
        setIsDetailOpen(false);
        setTimeout(() => {
          setSelectedBusiness({
            ...businessDetail,
            imageUrl: getPlaceholderImage()
          });
          setIsDetailOpen(true);
        }, 200); // Match animation duration
      } else {
        setSelectedBusiness({
          ...businessDetail,
          imageUrl: getPlaceholderImage()
        });
        setIsDetailOpen(true);
      }
    }
  };

  // Function to close business detail panel
  const handleCloseBusinessDetail = () => {
    setIsDetailOpen(false);
    // After animation completes, clear the selected business
    setTimeout(() => {
      setSelectedBusiness(null);
    }, 200); // Match animation duration
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleViewChange = (view) => {
    // Only allow list view on mobile
    if (view === 'list' && window.innerWidth >= 768) {
      return;
    }
    setCurrentView(view);
  };

  const categories = [
    { id: 'All', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, label: 'All' },
    { id: 'Inventory', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>, label: 'Inventory' },
    { id: 'Lawyer', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>, label: 'Lawyer' },
    { id: 'Repair', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: 'Repair' },
    { id: 'Media', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, label: 'Media' },
    { id: 'Print', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>, label: 'Print' },
    { id: 'Property', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, label: 'Property' },
    { id: 'IT', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: 'IT' },
    { id: 'Kitchenware', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, label: 'Kitchenware' },
    { id: 'Finance', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: 'Finance' },
    { id: 'Service', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: 'Service' },
    { id: 'Others', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>, label: 'Others' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Main content container - Added ID for targeting */}
        <div 
          id="main-content"
          className="w-full transition-width"
        >
          <div className="py-6 px-4">
            {/* Search Bar Section */}
            <div className="mb-10 mt-6">
              <SearchBar />
            </div>
            
            {/* Categories Section */}
            <div className="container mx-auto mb-8">
              <CategorySelector 
                categories={categories}
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryClick}
              />
            </div>
            
            {/* Filter Section */}
            <div className="container mx-auto flex justify-between mb-6">
              <div className="flex items-center bg-gray-100 rounded-full py-1 px-3">
                <input type="checkbox" id="wefood-verified" className="mr-2" />
                <label htmlFor="wefood-verified" className="text-sm flex items-center">
                  <span className="mr-1">👍</span>WEFOOD认证
                </label>
              </div>
              
              {/* Filter and View Toggle Component */}
              <FilterSort 
                onViewChange={handleViewChange}
                currentView={currentView}
              />
            </div>
            
            {/* Business Cards Section */}
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="container mx-auto">
                {/* Card Grid/List Container */}
                <div className={currentView === 'grid' 
                  ? 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4' 
                  : 'flex flex-col space-y-4'
                }>
                  {featuredBusinesses.map((business, index) => (
                    <BusinessCard
                      key={business.id}
                      business={{
                        ...business,
                        imageUrl: getPlaceholderImage(),
                        location: business.addresses || "Chino Hills, CA",
                        recommended: index % 2 === 0 // Just for demo
                      }}
                      view={currentView}
                      initialFavorited={index % 3 === 0} // For demonstration
                      onSave={(isFavorited) => console.log('Save business', business.id, isFavorited)}
                      onDetailsClick={() => handleShowBusinessDetail(business)}
                      onReviewClick={() => console.log('Write review', business.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Business Detail Side Panel */}
      <BusinessDetailPanel
        business={selectedBusiness}
        isOpen={isDetailOpen}
        onClose={handleCloseBusinessDetail}
      />
    </div>
  );
};

export default HomePage;