import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Header = ({ setShowLogin }) => {
  const [current, setCurrent] = useState(0);
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const items = [
    { type: 'img', src: assets.Header1, duration: 4000 },
    { type: 'img', src: assets.Header2, duration: 4000 },
    { type: 'video', src: assets.Header3, duration: 8000 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, items[current].duration);
    return () => clearInterval(interval);
  }, [current]);

  const handleShopNowClick = () => {
    // Navigate to explore menu section with smooth scrolling
    const exploreMenu = document.getElementById('explore-menu');
    if (exploreMenu) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = exploreMenu.offsetTop - navbarHeight - 20; // 20px extra offset
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback to hash navigation if element not found
      navigate('/#explore-menu');
    }
  };

  return (
    <div className='header'>
      <div className='header-slideshow'>
        {items.map((item, idx) =>
          item.type === 'img' ? (
            <img
              key={idx}
              src={item.src}
              alt={`Header${idx + 1}`}
              className={`header-slideshow-item${current === idx ? ' active' : ''}`}
            />
          ) : (
            <video
              key={idx}
              src={item.src}
              className={`header-slideshow-item${current === idx ? ' active' : ''}`}
              autoPlay
              loop
              muted
              playsInline
            />
          )
        )}
      </div>
      <div className='header-contents'>
        <h2>
          Build Your
          <span className='small-heading'>Ultimate Studio Setup</span>
        </h2>
        <p>
          Welcome to <strong>Genova.studio</strong> — your go-to destination for the ultimate gaming lifestyle. From high-performance hardware to immersive LED setups, craft a battlestation that's as powerful as it is aesthetic.
        </p>
        <button onClick={handleShopNowClick}>Shop Now</button>
      </div>
    </div>
  );
};

export default Header;
