// src/components/common/BusinessCard.js
import React, { useState } from 'react';

const BusinessCard = ({ 
  business, 
  view = 'grid', 
  onSave, 
  onDetailsClick, 
  onReviewClick,
  initialFavorited = false 
}) => {
  const [favorited, setFavorited] = useState(initialFavorited);
  const isGridView = view === 'grid';
  const isMobile = window.innerWidth < 768;
  
  const handleSave = () => {
    setFavorited(!favorited);
    if (onSave) {
      onSave(!favorited);
    }
  };

  return (
    <div 
      // DESIGN: Main card container
      className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 ${
        !isGridView && isMobile ? 'flex flex-col' : 
        !isGridView && !isMobile ? 'flex flex-row' : ''
      } ${isGridView ? 'h-full' : ''}`}
    >
      {/* DESIGN: Card Image */}
      <div className={`relative ${
        isGridView && isMobile ? 'aspect-square w-full' : 
        isGridView && !isMobile ? 'aspect-video w-full' : 
        !isGridView && isMobile ? 'h-48 w-full' :
        'h-48 w-48 min-w-[12rem]'
      }`}>
        <img 
          src={business.imageUrl || "https://placehold.co/200x120"} 
          alt={business.name} 
          className="w-full h-full object-cover"
        />
        {/* DESIGN: Bookmark/favorite button */}
        <button 
          className={`absolute top-2 right-2 ${
            favorited ? 'bg-blue-600' : 'bg-black bg-opacity-70'
          } rounded p-1`}
          onClick={handleSave}
          aria-label={favorited ? "Remove from favorites" : "Save business"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill={favorited ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        {/* DESIGN: WEFOOD recommendation badge */}
        {business.recommended && (
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1 text-sm">
            <span className="mr-1">👍</span>WEFOOD推荐
          </div>
        )}
      </div>
      
      {/* DESIGN: Card Content - Increased min-height for more space */}
      <div className={`${
        isGridView ? 'p-3 flex flex-col' : 
        !isGridView && isMobile ? 'p-3 flex flex-col' :
        'p-3 flex flex-col justify-between flex-grow'
      } ${isGridView ? 'min-h-[14rem]' : ''}`}>
        {/* DESIGN: Content container */}
        <div className="flex-grow">
          {/* DESIGN: Star ratings */}
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className={`h-4 w-4 ${star <= (business.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          {/* DESIGN: Business title */}
          <h3 className="text-lg font-medium mb-1 truncate">{business.name || "Card title 1/EN"}</h3>
          
          {/* DESIGN: Description */}
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{business.description || "Card description."}</p>
          
          {/* DESIGN: Location */}
          {business.location && (
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{business.location}</span>
            </div>
          )}
        </div>
        
        {/* DESIGN: Action Buttons - Increased spacing and padding */}
        {isGridView && isMobile ? (
          // Mobile Grid View - Vertical buttons with more spacing
          <div className="flex flex-col space-y-4 mt-4">
            {/* Learn More button - increased padding */}
            <button 
              className="w-full bg-black text-white text-sm py-2 px-3 rounded-none flex items-center justify-center"
              onClick={onDetailsClick}
            >
              了解更多
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Write Review button - increased spacing */}
            <button 
              className="w-full text-gray-600 text-sm text-center py-1"
              onClick={onReviewClick}
            >
              提写评论
            </button>
          </div>
        ) : (
          // All other views - Side by side with more space
          <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
            <button 
              className="text-gray-600 text-sm py-1"
              onClick={onReviewClick}
            >
              提写评论
            </button>
            <button 
              className="bg-black text-white text-sm py-1.5 px-4 rounded-full flex items-center"
              onClick={onDetailsClick}
            >
              了解更多
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;