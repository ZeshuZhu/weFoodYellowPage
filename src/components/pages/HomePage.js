import React, { useState, useEffect } from 'react';
import { loadBusinessData } from '../../utils/data';

const HomePage = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadBusinessData();
        // Just use the first 3 businesses for now
        setFeaturedBusinesses(data.slice(0, 3));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-100 rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">WeFood 黄页</h1>
        <p className="text-center text-gray-600 mb-6">连接餐厅与优质供应商的平台</p>
        
        {/* Search Placeholder */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索商家、服务或产品..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button 
              className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md"
            >
              搜索
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">按类别浏览</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {/* Category Placeholders */}
          {['供应链', '财务/法务', '装修/建筑', '咨询/媒体', '招牌/设计'].map((category, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-md shadow-sm border border-gray-200 text-center"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">推荐商家</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map(business => (
              <div 
                key={business.id} 
                className="bg-white p-4 rounded-md shadow-md border border-gray-200"
              >
                <h3 className="font-semibold mb-2">{business.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{business.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {business.tags.split(',').map((tag, i) => (
                    <span 
                      key={i} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{business.addresses}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;