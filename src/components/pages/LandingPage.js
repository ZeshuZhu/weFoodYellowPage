// src/components/pages/LandingPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import wefoodLogo from '../../assets/images/Logo.png'; // Make sure this path is correct

// Extended array of business card images for the gallery - more images to ensure no empty spaces
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add custom CSS for the landing page
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* Background gradient - exact values provided */
      .landing-bg {
        background: linear-gradient(179deg, rgba(255, 183, 0, 0.01) -60.96%, rgba(255, 255, 255, 0.20) 27.98%, rgba(213, 211, 244, 0.20) 116.92%), #FFF;
        overflow: hidden;
      }
      
      /* Text content group */
      .text-group {
        display: flex;
        width: 392px;
        flex-direction: column;
        align-items: flex-start;
        gap: 40px;
      }
      
      /* Logo dimensions */
      .wefood-logo {
        width: 120px;
        height: 33.812px;
        aspect-ratio: 120.00/33.81;
        object-fit: contain;
      }
      
      /* Heading */
      .main-heading {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        font-size: 40px;
        line-height: 1.2;
        font-weight: bold;
        margin: 0;
      }
      
      /* Description */
      .description {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        font-size: 20px;
        color: #333;
        margin: 0;
      }
      
      /* CTA Button */
      .cta-button {
        display: flex;
        width: 200px;
        padding: 16px 22.5px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        background-color: #000;
        color: #fff;
        border-radius: 4px;
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        border: none;
        cursor: pointer;
      }
      
      /* Login link */
      .login-link {
        color: #007BFF;
        text-decoration: none;
      }
      
      .login-link:hover {
        text-decoration: underline;
      }
      
      /* Card Display Layout */
      .card-display {
        position: absolute;
        top: 0;
        right: 0;
        width: 60%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
      }
      
      /* Container that holds all columns */
      .card-container {
        position: absolute;
        top: 50%;
        right: -5%;
        transform: translateY(-50%) rotate(-18.654deg);
        width: 900px;
        display: flex;
        gap: 12px;
      }
      
      /* Column wrapper to create infinite scroll effect */
      .column-wrapper {
        overflow: hidden;
      }
      
      /* Columns scrolling in alternating directions with proper infinite scroll */
      .card-column {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .card-column-1 {
        animation: infiniteScrollUp 360s linear infinite;
      }
      
      .card-column-2 {
        animation: infiniteScrollDown 360s linear infinite;
      }
      
      .card-column-3 {
        animation: infiniteScrollUp 360s linear infinite;
      }
      
      .card-column-4 {
        animation: infiniteScrollDown 360s linear infinite;
      }
      
      /* Animation for infinite scroll up - using CSS transform to create true infinite loop */
      @keyframes infiniteScrollUp {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-50%);
        }
      }
      
      /* Animation for infinite scroll down - using CSS transform to create true infinite loop */
      @keyframes infiniteScrollDown {
        0% {
          transform: translateY(-50%);
        }
        100% {
          transform: translateY(0);
        }
      }
      
      /* Individual card styling - no visible borders */
      .card {
        width: 204px;
        height: 315px;
        border-radius: 8px;
        overflow: hidden;
        background-color: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      
      .card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      /* Mobile styles */
      @media (max-width: 768px) {
        .landing-container {
          flex-direction: column;
        }
        
        .text-group {
          width: 100%;
          max-width: 392px;
          margin: 0 auto;
          align-items: center;
        }
        
        .main-heading, .description {
          justify-content: center;
          text-align: center;
        }
        
        .card-display {
          position: relative;
          width: 100%;
          height: 400px;
          margin-top: 40px;
        }
        
        .card-container {
          position: relative;
          transform: none;
          width: 100%;
          overflow-x: auto;
          padding: 20px;
          gap: 16px;
          justify-content: flex-start;
          overflow-y: hidden;
        }
        
        .column-wrapper {
          width: auto;
          height: auto;
        }
        
        .card-column {
          flex-direction: row;
          animation: none;
        }
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Create cards for each column to ensure a seamless infinite scroll
  // Each column needs to have its content duplicated to ensure a seamless loop
  const generateColumnCards = (startIndex, count) => {
    const cards = [];
    // Create enough cards to fill the height and ensure smooth looping
    for (let i = 0; i < count; i++) {
      const cardIndex = (startIndex + i) % businessCards.length;
      cards.push(businessCards[cardIndex]);
    }
    // Duplicate all cards to create the seamless loop
    return [...cards, ...cards];
  };

  return (
    <div className="landing-bg min-h-screen">
      <div className="relative min-h-screen landing-container flex flex-row">
        {/* Left content section with exact specifications */}
        <div className="w-1/2 px-16 flex items-center">
          <div className="text-group">
            {/* Logo with exact dimensions */}
            <img src={wefoodLogo} alt="WEFOOD" className="wefood-logo" />
            
            {/* Main heading with exact specs */}
            <h1 className="main-heading">Where trusted partnerships begin.</h1>
            
            {/* Description with exact specs */}
            <p className="description">10,000人驻商家信赖选择</p>
            
            {/* CTA Button with exact specs */}
            <Link to="/home" className="cta-button">
              入驻平台
            </Link>
            
            {/* Login link */}
            <div className="text-sm text-gray-500">
              <p>已有账号? <Link to="/login" className="login-link">登录</Link></p>
            </div>
          </div>
        </div>
        
        {/* Card display section with four vertical scrolling columns */}
        <div className="card-display">
          <div className="card-container">
            {/* Column 1 */}
            <div className="column-wrapper">
              <div className="card-column card-column-1">
                {generateColumnCards(0, 8).map((card, index) => (
                  <div key={`col1-${index}`} className="card">
                    <img src={card.imageUrl} alt={card.name} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="column-wrapper">
              <div className="card-column card-column-2">
                {generateColumnCards(4, 8).map((card, index) => (
                  <div key={`col2-${index}`} className="card">
                    <img src={card.imageUrl} alt={card.name} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Column 3 */}
            <div className="column-wrapper">
              <div className="card-column card-column-3">
                {generateColumnCards(8, 8).map((card, index) => (
                  <div key={`col3-${index}`} className="card">
                    <img src={card.imageUrl} alt={card.name} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Column 4 */}
            <div className="column-wrapper">
              <div className="card-column card-column-4">
                {generateColumnCards(12, 8).map((card, index) => (
                  <div key={`col4-${index}`} className="card">
                    <img src={card.imageUrl} alt={card.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;