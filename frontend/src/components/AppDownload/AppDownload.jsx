import React, { useMemo } from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  const companies = useMemo(() => {
    const shuffled = [
      {
        name: <a href="https://www.asus.com" target="_blank" rel="noopener noreferrer">ASUS</a>,
        description: 'Innovative hardware powering gamers and creators worldwide.',
        logo: assets.asus_1 || 'company1.png',
      },
      {
        name: <a href="https://www.playstation.com" target="_blank" rel="noopener noreferrer">PlayStation</a>,
        description: 'Iconic gaming experiences with cutting-edge performance.',
        logo: assets.SonyP || 'company2.png',
      },
      {
        name: <a href="https://www.nvidia.com" target="_blank" rel="noopener noreferrer">NVIDIA</a>,
        description: 'Revolutionizing gaming with powerful graphics and AI tech.',
        logo: assets.nvidia || 'company3.png',
      },
      {
        name: <a href="https://tracknest.com" target="_blank" rel="noopener noreferrer">TrackNest</a>,
        description: 'Smart tracking for your daily expenses.',
        logo: assets.TN || 'company4.png',
      },
    ].sort(() => 0.5 - Math.random()); // Shuffle
    return shuffled;
  }, []);

  return (
    <div className="collab-container" id="app-download">
      <h2 className="collab-heading">Brand Connection</h2>

      <div className="brands-grid">
        {companies.map((company, index) => (
          <div className="brand-card" key={index} style={{ '--index': index }}>
            <img src={company.logo} alt="brand" />
            <div className="brand-info">
              <h4>{company.name}</h4>
              <p>{company.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="app-download-section">
        <h3>Download the <span className="highlight">GenovaStudio</span> App</h3>
        <p>For a smoother experience and full control over your setup.</p>
        <div className="store-buttons">
          <img src={assets.play_store} alt="Google Play" />
          <img src={assets.app_store} alt="App Store" />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
