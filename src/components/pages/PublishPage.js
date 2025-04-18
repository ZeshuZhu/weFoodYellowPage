import React from 'react';

const PublishPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">发布商家信息</h1>
      <p className="text-gray-600 mb-6">在这里，您可以发布您的商家信息到 WeFood 黄页</p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium mb-4">基本信息</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">商家名称</label>
            <input
              id="business-name"
              name="business-name"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="输入商家名称"
            />
          </div>
          
          <div>
            <label htmlFor="business-type" className="block text-sm font-medium text-gray-700">商家类型</label>
            <select
              id="business-type"
              name="business-type"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">请选择...</option>
              <option value="supply-chain">供应链</option>
              <option value="finance-legal">财务/法务</option>
              <option value="renovation">装修/建筑</option>
              <option value="consulting">咨询/媒体</option>
              <option value="design">招牌/设计/打印</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="business-description" className="block text-sm font-medium text-gray-700">商家描述</label>
            <textarea
              id="business-description"
              name="business-description"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="描述您的商家..."
            ></textarea>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-blue-600"
            >
              提交
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishPage;