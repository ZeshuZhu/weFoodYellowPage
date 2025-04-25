import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/Logo.png'; // 请替换为svg！！！！

/**
 * 页眉组件 - 主导航页眉
 * 
 * 功能特点：
 * - 徽标和导航
 * - 用户认证菜单（登录/注册或用户资料下拉菜单）
 * - 带有汉堡菜单的移动响应式设计
 * - 已登录用户的下拉菜单
 */

const Header = () => {
   /**
   * 状态声明
   * 
   * isLoggedIn: 用户认证状态（为测试设置为true）
   * dropdownOpen: 控制桌面用户下拉菜单的可见性
   * mobileMenuOpen: 控制移动侧边菜单的可见性
   */
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 目前默认完成验证，后续接入验证系统后在此修改
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // 下拉菜单和移动菜单的引用
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);


  //处理下拉菜单/移动菜单外部的点击以关闭它们

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // 在移动菜单打开时防止正文滚动
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Left side - Logo and Name */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="WeFood Logo" className="h-8" />
          </Link>
          
          {/* Right side - User info or Login/Signup */}
          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">User SGHJDS2</span>
                </button>
                
                {/* Desktop dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <div className="py-1">
                      <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        我的账号
                      </Link>
                      <Link to="/business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        我的商户
                      </Link>
                      <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        我的收藏
                      </Link>
                      <button 
                        onClick={() => setIsLoggedIn(false)} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        登出
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  注册
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile user icon or login/register buttons */}
          <div className="md:hidden flex items-center gap-3">
            {isLoggedIn ? (
              <button 
                className="flex items-center justify-center"
                onClick={() => setMobileMenuOpen(true)}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile side menu (slides in from right) */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          ref={mobileMenuRef}
          className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Side menu header */}
          <div className="p-4 border-b border-gray-200">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -m-2 text-gray-700"
            >
              <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          {/* Side menu content */}
          <div className="flex flex-col h-full">
            <div className="flex-grow p-4 space-y-4">
              <Link to="/account" className="block py-2 text-gray-700 hover:text-blue-600">
                我的账号
              </Link>
              <Link to="/business" className="block py-2 text-gray-700 hover:text-blue-600">
                我的商户
              </Link>
              <Link to="/favorites" className="block py-2 text-gray-700 hover:text-blue-600">
                我的收藏
              </Link>
            </div>
            
            {/* Bottom section */}
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-center text-gray-700 hover:bg-gray-50"
              >
                登出
              </button>
              
              <div className="mt-4 space-y-2">
                <Link to="/privacy" className="block text-sm text-gray-500 hover:text-gray-700">
                  隐私及权限
                </Link>
                <Link to="/about" className="block text-sm text-gray-500 hover:text-gray-700">
                  版本信息
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;