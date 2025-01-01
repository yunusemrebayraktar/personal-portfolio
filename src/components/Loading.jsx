import { useState, useEffect } from 'react';
import '../styles/Loading.css';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <div className="loading-text">
        Loading{dots}
      </div>
    </div>
  );
};

export default Loading; 