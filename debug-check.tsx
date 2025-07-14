import React from 'react';

const DebugCheck: React.FC = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: 9999, 
      backgroundColor: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px',
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <h3>🔍 Debug Info</h3>
      <p>✅ React is rendering</p>
      <p>✅ Mapbox token: {import.meta.env.VITE_MAPBOX_TOKEN ? 'Set' : 'Missing'}</p>
      <p>✅ Current URL: {window.location.href}</p>
      <p>✅ Viewport: {window.innerWidth}x{window.innerHeight}</p>
      <p>Press F12 to check console for errors</p>
    </div>
  );
};

export default DebugCheck; 