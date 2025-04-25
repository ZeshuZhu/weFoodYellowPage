import React, { useState, useEffect } from 'react';

/**
 * BusinessCard Component
 * 商家卡片组件
 * 
 * Displays business information in either grid or list view
 * 以网格或列表视图显示商家信息
 * 
 * 功能特点：
 * - 响应式设计，适应不同屏幕尺寸
 * - 保存/收藏功能
 * - WEFOOD推荐标记（用于推广商家）
 * - 网格与列表视图的不同布局
 * - 基于视图模式的动态图片尺寸
 */

const BusinessCard = ({ 
  business, 
  view = 'grid', 
  onSave, 
  onDetailsClick, 
  onReviewClick,
  initialFavorited = false 
}) => {
// 收藏状态和响应式设计的状态
  const [favorited, setFavorited] = useState(initialFavorited);
  const isGridView = view === 'grid';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);
  
  // 处理窗口大小变化以检测移动设备
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 切换收藏状态并调用onSave回调
  const handleSave = () => {
    setFavorited(!favorited);
    if (onSave) {
      onSave(!favorited);
    }
  };

  // 描述文本截断的CSS样式 - 兼容各种浏览器
  const descriptionStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    marginBottom: '8px'
  };

  // 根据视图模式和屏幕大小获取适当的占位图片,链接后缀为需要图片资源的大小
  const getPlaceholderImage = () => {
    if (isGridView) {
      // 网格视图 - 正方形图片 (640x640)
      return "https://placehold.co/640x640";
    } else {
      // 列表视图
      if (isSmallMobile) {
        // 小型移动设备 - 16:9宽高比 (960x540)
        return "https://placehold.co/960x540";
      } else {
        // 桌面/平板 - 4:3宽高比 (384x288)
        return "https://placehold.co/384x288";
      }
    }
  };

  //组件JSX在下面继续 （下列注解由ChatGPT生成）
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 ${
        !isGridView ? (isSmallMobile ? 'flex flex-col' : 'flex flex-row') : ''
      } ${isGridView ? 'h-full' : ''}`}
    >
      {/* Card Image */}
      <div className={`relative ${
        isGridView ? 'aspect-square w-full' : 
        isSmallMobile ? 'w-full aspect-video' : 'w-48 min-w-[12rem]'
      }`}>
        <img 
          src={business.imageUrl || getPlaceholderImage()} 
          alt={business.name} 
          className="w-full h-full object-cover"
        />
        {/* Bookmark/favorite button */}
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
        {/* WEFOOD recommendation badge */}
        {business.recommended && (
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1 text-sm">
            <span className="mr-1">👍</span>WEFOOD推荐
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className={`p-3 ${!isGridView ? 'flex-grow flex flex-col' : ''}`}>
        {isGridView ? (
          // Grid View Layout
          <div className="flex flex-col h-full">
            {/* Fixed height content container */}
            <div className="flex-grow" style={{ minHeight: '100px' }}>
              {/* Star ratings */}
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
              
              {/* Business title */}
              <h3 className="text-lg font-medium mb-1 truncate">{business.name || "Card title 1/EN"}</h3>
              
              {/* Description - UPDATED with cross-browser compatible style */}
              <p className="text-gray-500 text-sm" style={descriptionStyle}>
                {business.description || "Card description."}
              </p>
              
              {/* Location - FIXED POSITION */}
              {business.location && (
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{business.location}</span>
                </div>
              )}
            </div>
            
            {/* Grid View Buttons */}
            {isMobile ? (
              // Mobile Grid View: Vertical buttons
              <div className="mt-2">
                <button 
                  className="w-full bg-black text-white text-sm py-2 px-3 mb-2 rounded-md border border-black"
                  onClick={onDetailsClick}
                >
                  了解更多
                </button>
                <button 
                  className="w-full text-gray-600 text-sm py-1 border border-transparent hover:border-gray-300 rounded-md"
                  onClick={onReviewClick}
                >
                  提写评论
                </button>
              </div>
            ) : (
              // Desktop Grid View: Horizontal buttons
              <div className="flex justify-end items-center mt-2 space-x-4">
                <button 
                  className="text-gray-600 text-sm py-1 border border-transparent hover:border-gray-300 rounded-md"
                  onClick={onReviewClick}
                >
                  提写评论
                </button>
                <button 
                  className="bg-black text-white text-sm py-1.5 px-4 rounded-md border border-black"
                  onClick={onDetailsClick}
                >
                  了解更多
                </button>
              </div>
            )}
          </div>
        ) : (
          // List/Row View Layout - Now with mobile responsiveness
          <div className="flex flex-col justify-between h-full">
            {/* Top content section */}
            <div>
              {/* Star ratings */}
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
              
              {/* Business title */}
              <h3 className="text-lg font-medium mb-1 truncate">{business.name || "Card title 1/EN"}</h3>
              
              {/* Description - UPDATED with cross-browser compatible style */}
              <p className="text-gray-500 text-sm" style={descriptionStyle}>
                {business.description || "Card description."}
              </p>
              
              {/* Location - FIXED POSITION */}
              {business.location && (
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{business.location}</span>
                </div>
              )}
            </div>
            
            {/* Bottom section with buttons - Responsive layout based on mobile or desktop */}
            {isSmallMobile ? (
              // Small Mobile List View: Vertical buttons
              <div className="mt-2">
                <button 
                  className="w-full bg-black text-white text-sm py-2 px-3 mb-2 rounded-md border border-black"
                  onClick={onDetailsClick}
                >
                  了解更多
                </button>
                <button 
                  className="w-full text-gray-600 text-sm py-1 border border-transparent hover:border-gray-300 rounded-md"
                  onClick={onReviewClick}
                >
                  提写评论
                </button>
              </div>
            ) : (
              // Desktop/Tablet List View: Horizontal buttons
              <div className="flex justify-end items-center mt-2 space-x-4">
                <button 
                  className="text-gray-600 text-sm py-1 border border-transparent hover:border-gray-300 rounded-md"
                  onClick={onReviewClick}
                >
                  提写评论
                </button>
                <button 
                  className="bg-black text-white text-sm py-1.5 px-4 rounded-md border border-black"
                  onClick={onDetailsClick}
                >
                  了解更多
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;