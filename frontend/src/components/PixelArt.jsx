import React from 'react';
import { motion } from 'framer-motion';
import transition from '../transition';
import '../styles/PixelArt.css';

const PixelArt = () => {
  // Import all pixel art images from assets
  const importAll = (r) => {
    return r.keys().map(r);
  };
  
  // Get all images from the pixelart directory
  const images = importAll(require.context('../assets/pixelart', false, /\.(png|jpe?g|svg)$/));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pixel-art">
      <div className="pixel-art-container">
        <div className="pixel-art-header">
          <h1>Pixel Art Gallery</h1>
          <p>A collection of my amateur pixel art creations</p>
        </div>

        <motion.div 
          className="pixel-art-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="pixel-art-item"
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="pixel-art-image-wrapper">
                <img 
                  src={image} 
                  alt={`Pixel Art ${index + 1}`} 
                  className="pixel-art-image"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default transition(PixelArt); 