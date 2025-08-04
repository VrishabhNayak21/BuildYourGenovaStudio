import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className="footer" id='footer'>
      <div className="footer-content">

        {/* Left: Logo */}
        <div className="footer-column">
          <img src={assets.logo} alt="Logo" className="footer-logo" />
        </div>

        {/* Center: Policies */}
        <div className="footer-column center-column">
          <h4>Policies</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
          <a href="#">Shipping Policy</a>
        </div>

        {/* Right: Social Media & Contact */}
        <div className="footer-column right-column">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="https://x.com/VrishabhNayak" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter} alt="X" />
            </a>
            <a href="https://www.instagram.com/mr_rubicon/" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram} alt="Instagram" />
            </a>
            <a href="https://github.com/VrishabhNayak21" target="_blank" rel="noopener noreferrer">
              <img src={assets.github} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/vrishabh-nayak-231079266/" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin} alt="LinkedIn" />
            </a>
          </div>
          <div className="footer-contact">
            <p>Email: support@builyourgenovastudio.com</p>
            <p>Contact: +12-345-689-78</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        © 2025 <span className="brand">BuildYourGenovaStudio.</span> All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
