import React, { useState, useEffect } from 'react';
import './ExploreMenu.css';
import { menu_list, assets } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { type: 'img', src: assets.Explore1 },
    { type: 'video', src: assets.Explore3 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, currentSlide === 0 ? 3000 : 6000); // 3s for image, 6s for video
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='explore-menu-content'>
        <div className='explore-menu-left'>
          <h1>Explore Our Products</h1>
          <p className='explore-menu-text'>
            Welcome to <strong>Genova.studio</strong> — your ultimate destination for elite gaming gear.
            Whether you're crafting your first setup or upgrading to a full-blown battlestation, we’ve got the tech you crave.

            Discover the latest <strong>PlayStation 5</strong> consoles, ultra-smooth <strong>high-refresh monitors</strong>,
            blazing-fast <strong>GPUs & CPUs</strong>, and <strong>custom mechanical keyboards</strong> that redefine performance. <br />
            Level up with precision <strong>gaming mice</strong>, immersive <strong>surround-sound headsets</strong>, and
            <strong> ergonomic chairs</strong> built for endurance. Add flair with LED lighting, cable management, and premium desk
            accessories — everything you need to transform your space into the ultimate gaming zone.
          </p>
        </div>

        <div className='explore-menu-right'>
          <div className='explore-slideshow'>
            {slides.map((slide, idx) =>
              slide.type === 'img' ? (
                <img
                  key={idx}
                  src={slide.src}
                  alt={`Explore${idx + 1}`}
                  className={`explore-slide${currentSlide === idx ? ' active' : ''}`}
                />
              ) : (
                <video
                  key={idx}
                  src={slide.src}
                  className={`explore-slide${currentSlide === idx ? ' active' : ''}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            key={index}
            className='explore-menu-list-item'
          >
            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ExploreMenu;
