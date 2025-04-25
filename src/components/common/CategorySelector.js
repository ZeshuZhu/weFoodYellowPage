import React, { useRef, useState, useEffect } from 'react';

const CategorySelector = ({ categories, activeCategory, onCategoryClick }) => {
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check if we need arrows and update their visibility
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    const needArrows = scrollWidth > clientWidth;
    setShowArrows(needArrows);
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); 
  };

  useEffect(() => {
    checkScrollPosition();

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
    }
    window.addEventListener('resize', checkScrollPosition);
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const categoryWidth = container.firstChild ? container.firstChild.offsetWidth + 24 : 100; 
    
    container.scrollBy({
      left: -categoryWidth * 3, 
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const categoryWidth = container.firstChild ? container.firstChild.offsetWidth + 24 : 100; 
    
    container.scrollBy({
      left: categoryWidth * 3, 
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative overflow-hidden">
        {showArrows && showLeftArrow && (
          <div className="absolute left-0 top-0 h-full flex items-center z-10 pointer-events-none">
            <div className="h-full w-16 bg-gradient-to-r from-white to-transparent"></div>
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 ml-1 pointer-events-auto"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-4 px-10 gap-8 hide-scrollbar mx-auto"
            style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            maxWidth: '100%',
            justifyContent: !showArrows ? 'center' : 'flex-start'
          }}
        >
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`flex flex-col items-center cursor-pointer min-w-[80px] px-2 ${
                activeCategory === category.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => onCategoryClick(category.id)}
            >
              <div className={`p-2 rounded-full ${
                activeCategory === category.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {category.icon}
              </div>
              <span className={`text-xs mt-1 font-medium ${
                activeCategory === category.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {category.label}
              </span>
              {activeCategory === category.id && (
                <div className="h-0.5 w-5 bg-blue-600 mt-1 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
        
        {showArrows && showRightArrow && (
          <div className="absolute right-0 top-0 h-full flex items-center z-10 pointer-events-none">
            <div className="h-full w-16 bg-gradient-to-l from-white to-transparent"></div>
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 mr-1 pointer-events-auto"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;