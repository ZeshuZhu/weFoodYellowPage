import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import wefoodLogo from '../../assets/images/Logo.png';

/**
 * 着陆页组件 - 应用程序的初始入口页面
 * 
 * 功能特点：
 * - WeFood平台的视觉介绍
 * - 动画商家卡片展示
 * - 用于注册和登录的行动号召按钮
 * - 具有不同移动和桌面布局的完全响应式设计
 * 
 * 布局根据屏幕大小动态调整：
 * - 桌面：分屏，文字在左，动画卡片在右
 * - 移动：堆叠布局，文字在上方，垂直滚动卡片在下方
 */

// 用于动画显示的商家卡片数据（后续图片替换）
const businessCards = [
    { id: 1, name: 'DeesSeafood', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Dees+Seafood' },
    { id: 2, name: 'KitchenEquipment', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Kitchen+Equipment' },
    { id: 3, name: 'ConstructionCorp', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Construction+Corp' },
    { id: 4, name: 'StarmaxDesign', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Starmax+Design' },
    { id: 5, name: 'HungVuongMarket', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Hung+Vuong+Market' },
    { id: 6, name: 'KirinProduce', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Kirin+Produce' },
    { id: 7, name: 'ParkToShop', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Park+To+Shop' },
    { id: 8, name: 'FreshFoodSupply', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Fresh+Food+Supply' },
    { id: 9, name: 'JFConstruction', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=JF+Construction' },
    { id: 10, name: 'MZDesign', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=MZ+Design' },
    { id: 11, name: 'ICBranding', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=IC+Branding' },
    { id: 12, name: 'LEDLights', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=LED+Lights' },
    { id: 13, name: 'AsianMarket', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Asian+Market' },
    { id: 14, name: 'SeafoodSupplier', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Seafood+Supplier' },
    { id: 15, name: 'NYConstruction', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=NY+Construction' },
    { id: 16, name: 'StarDesign', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Star+Design' },
    { id: 17, name: 'ChineseRestaurant', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Chinese+Restaurant' },
    { id: 18, name: 'WayfongFoods', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Wayfong+Foods' },
    { id: 19, name: 'ChenlinGraphic', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Chenlin+Graphic' },
    { id: 20, name: 'BostonMarket', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Boston+Market' },
    { id: 21, name: 'FoodsSupply', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Foods+Supply' },
    { id: 22, name: 'Designers', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Designers' },
    { id: 23, name: 'NYMarket', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=NY+Market' },
    { id: 24, name: 'RestaurantEquipment', imageUrl: 'https://placehold.co/204x315/e6e6e6/666?text=Restaurant+Equipment' }
  ];

const LandingPage = () => {
//响应式布局和定位的状态
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [rightPosition, setRightPosition] = useState('-65%');

  
  /**
   * 处理窗口大小变化以实现响应式布局
   * 
   * 根据屏幕宽度调整卡片显示的位置
   */
  useEffect(() => {
    
    const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        
        // 根据屏幕宽度设置右侧动画gallery的位置
        if (width >= 1920) {
          setRightPosition('-35%');
        } else if (width >= 1440 || width >= 1366) {
          setRightPosition('-65%');
        } else if (width >= 1280) {
          setRightPosition('-90%');
        } else if (width >= 1100) {
          setRightPosition('-105%');
        } else if (width >= 1000) {
          setRightPosition('-130%');
        } else if (width >= 888) {
            setRightPosition('-155%');
          }else if (width >= 768) {
            setRightPosition('-200%');
          }
      };
      
      handleResize();
    
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 为每列生成卡片以确保无缝的无限滚动效果
  const generateColumnCards = (startIndex, count) => {
    const cards = [];
    for (let i = 0; i < count; i++) {
      const cardIndex = (startIndex + i) % businessCards.length;
      cards.push(businessCards[cardIndex]);
    }
    return [...cards, ...cards];
  };

  return (
    <>
      {/* Background Overlay - positioned beneath content but above body background */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom,rgba(255, 183, 0, 0.05) , #FFFFFF, #D5D3F4)',
          zIndex: 0 
        }}
      ></div>
      
      {/* Content Container - positioned above the background overlay */}
      <div 
        className="relative min-h-screen"
        style={{ 
          position: 'relative',
          zIndex: 1 
        }}
      >
        <div className="relative min-h-screen flex flex-col md:flex-row">
          {/* Left content section */}
          <div className="w-full md:w-5/12 px-6 md:px-16 flex items-center justify-center md:justify-end">
            <div className="text-group">
              {/* Logo with exact dimensions */}
              <img src={wefoodLogo} alt="WEFOOD" className="wefood-logo" />
              
              {/* Main heading */}
              <h1 className="main-heading">Where trusted partnerships begin.</h1>
              
              {/* Description */}
              <p className="description">10,000人驻商家信赖选择</p>
              
              {/* CTA Button */}
              <Link to="/home" className="cta-button">
                入驻平台
              </Link>
              
              {/* Login link */}
              <div className="text-sm text-gray-500">
                <p>已有账号? <Link to="/login" className="login-link">登录</Link></p>
              </div>
            </div>
          </div>
          
          {/* Card display section - with soft edge gradients */}
          <div 
            className="card-display"
            style={{
              position: isMobile ? 'relative' : 'absolute',
              top: 0,
              right: 0,
              width: isMobile ? '100%' : '60%',
              height: isMobile ? '400px' : '100%',
              overflow: 'hidden',
              pointerEvents: 'none'
            }}
          >
            {/* Soft edge left */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '80px',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255,255,255,0))',//先不用，会有根线
                zIndex: 3,
                pointerEvents: 'none'
              }}
            ></div>
            
            {isMobile ? (
              // New mobile vertical card display with 5 columns
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  overflow: 'hidden'
                }}
              >
                {/* Five column layout for mobile */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '0 10px'
                }}>
                  {/* Column 1 */}
                  <div style={{ overflow: 'hidden', width: '60px' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        animation: 'mobileScrollRight 30s linear infinite'
                      }}
                    >
                      {generateColumnCards(0, 5).map((card, index) => (
                        <div 
                          key={`mobile-col1-${index}`} 
                          style={{
                            width: '60px',
                            height: '90px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            marginBottom: '10px',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={card.imageUrl} 
                            alt={card.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Column 2 */}
                  <div style={{ overflow: 'hidden', width: '60px' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        animation: 'mobileScrollLeft 30s linear infinite'
                      }}
                    >
                      {generateColumnCards(5, 5).map((card, index) => (
                        <div 
                          key={`mobile-col2-${index}`} 
                          style={{
                            width: '60px',
                            height: '90px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            marginBottom: '10px',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={card.imageUrl} 
                            alt={card.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Column 3 */}
                  <div style={{ overflow: 'hidden', width: '60px' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        animation: 'mobileScrollRight 25s linear infinite'
                      }}
                    >
                      {generateColumnCards(10, 5).map((card, index) => (
                        <div 
                          key={`mobile-col3-${index}`} 
                          style={{
                            width: '60px',
                            height: '90px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            marginBottom: '10px',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={card.imageUrl} 
                            alt={card.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Column 4 */}
                  <div style={{ overflow: 'hidden', width: '60px' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        animation: 'mobileScrollLeft 35s linear infinite'
                      }}
                    >
                      {generateColumnCards(15, 5).map((card, index) => (
                        <div 
                          key={`mobile-col4-${index}`} 
                          style={{
                            width: '60px',
                            height: '90px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            marginBottom: '10px',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={card.imageUrl} 
                            alt={card.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Column 5 */}
                  <div style={{ overflow: 'hidden', width: '60px' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        animation: 'mobileScrollRight 40s linear infinite'
                      }}
                    >
                      {generateColumnCards(20, 5).map((card, index) => (
                        <div 
                          key={`mobile-col5-${index}`} 
                          style={{
                            width: '60px',
                            height: '90px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            marginBottom: '10px',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={card.imageUrl} 
                            alt={card.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Fade overlay at top and bottom for smoother scrolling effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '60px',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))',
                  pointerEvents: 'none',
                  zIndex: 2
                }}></div>
                
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60px',
                  background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))',
                  pointerEvents: 'none',
                  zIndex: 2
                }}></div>
              </div>
            ) : (
              // Desktop vertical columns - UPDATED to 5 columns
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: rightPosition,
                  transform: 'translateY(-50%) rotate(-18.654deg)',
                  width: '1020px', // Increased width to accommodate 5 columns
                  display: 'flex',
                  gap: '12px'
                }}
              >
                {/* Column 1 */}
                <div style={{ overflow: 'hidden' }}>
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      animation: 'infiniteScrollUp 360s linear infinite' //动画持续时间
                    }}
                  >
                    {generateColumnCards(0, 8).map((card, index) => (
                      <div 
                        key={`col1-${index}`} 
                        style={{
                          width: '204px',
                          height: '315px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: 'white',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                      >
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Column 2 */}
                <div style={{ overflow: 'hidden' }}>
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      animation: 'infiniteScrollDown 360s linear infinite' //动画持续时间
                    }}
                  >
                    {generateColumnCards(4, 8).map((card, index) => (
                      <div 
                        key={`col2-${index}`} 
                        style={{
                          width: '204px',
                          height: '315px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: 'white',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                      >
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Column 3 */}
                <div style={{ overflow: 'hidden' }}>
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      animation: 'infiniteScrollUp 360s linear infinite' //动画持续时间
                    }}
                  >
                    {generateColumnCards(8, 8).map((card, index) => (
                      <div 
                        key={`col3-${index}`} 
                        style={{
                          width: '204px',
                          height: '315px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: 'white',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                      >
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Column 4 */}
                <div style={{ overflow: 'hidden' }}>
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      animation: 'infiniteScrollDown 360s linear infinite' //动画持续时间
                    }}
                  >
                    {generateColumnCards(12, 8).map((card, index) => (
                      <div 
                        key={`col4-${index}`} 
                        style={{
                          width: '204px',
                          height: '315px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: 'white',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                      >
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* NEW Column 5 */}
                <div style={{ overflow: 'hidden' }}>
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      animation: 'infiniteScrollUp 360s linear infinite' //动画持续时间
                    }}
                  >
                    {generateColumnCards(16, 8).map((card, index) => (
                      <div 
                        key={`col5-${index}`} 
                        style={{
                          width: '204px',
                          height: '315px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: 'white',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                      >
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style>{`
        @keyframes infiniteScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        @keyframes infiniteScrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        
        /* Parallel animations for mobile */
        @keyframes mobileScrollRight {
          0% { transform: translateX(0); }
          50% { transform: translateX(15px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes mobileScrollLeft {
          0% { transform: translateX(0); }
          50% { transform: translateX(-15px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default LandingPage;