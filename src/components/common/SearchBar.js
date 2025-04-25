import React, { useState } from 'react';


/**
 * 搜索栏组件 - 用于搜索商家的输入框
 * 
 * 功能特点：
 * - 适用于移动和桌面的响应式设计
 * - 针对不同屏幕尺寸的不同按钮样式
 * - 解释搜索功能的占位符文本
 * 
 * 目前对搜索使用占位符警报功能
 * 未来应连接到实际的搜索功能
 */

const SearchBar = () => {
// 搜索查询输入的状态
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * 处理搜索表单提交
   * 
   * 目前显示一个警报 - 应替换为实际搜索
   */

  const handleSearch = (e) => {
    e.preventDefault();
    alert('Search clicked!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex w-full shadow-md rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="What kind of business are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-6 border border-gray-200 focus:outline-none rounded-l-full"
          />
          
          {/* Desktop and Tablet Search Button */}
          <button
            type="submit"
            className="hidden md:flex px-8 bg-black text-white items-center justify-center rounded-r-full"
          >
            Search
          </button>
          
          {/* Mobile Search Button (magnifying glass icon) */}
          <button
            type="submit"
            className="md:hidden w-14 bg-black text-white flex items-center justify-center rounded-r-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;