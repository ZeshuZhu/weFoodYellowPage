import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BusinessDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/search" className="text-primary hover:underline">&larr; 返回搜索结果</Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">商家详情页</h1>
      <p className="text-gray-600">这里将显示 ID 为 {id} 的商家详细信息...</p>
    </div>
  );
};

export default BusinessDetailPage;