import React, { useState } from 'react';
import './DemoMode.scss';

const DemoMode = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="demo-mode-banner">
      <div className="demo-content">
        <span className="demo-icon">🚀</span>
        <span className="demo-text">
          <strong>Demo Mode:</strong> You're using BlogSphere with mock data. 
          All features work perfectly for testing!
        </span>
        <button 
          onClick={() => setIsVisible(false)}
          className="close-btn"
          aria-label="Close demo mode notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default DemoMode;

