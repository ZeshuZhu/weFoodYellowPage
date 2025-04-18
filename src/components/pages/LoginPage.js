import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">登录 WeFood</h1>
          <p className="mt-2 text-gray-600">登录您的账户以使用全部功能</p>
        </div>
        
        <div className="mt-8">
          {/* Login form placeholder */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">密码</label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-blue-600"
              >
                登录
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            还没有账户? <Link to="/register" className="text-primary hover:underline">注册</Link>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-primary hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;