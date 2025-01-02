import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette } from 'react-icons/fa';
import transition from '../transition';
import '../styles/PixelArt.css';

const PixelArt = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Import all pixel art images from assets
  const importAll = (r) => {
    return r.keys().map((key) => ({
      src: r(key),
      title: key
        .replace(/^.*[/\\]/, '')  // Remove path
        .split('.')[0]            // Remove extension
        .replace(/^\d+_/, '')     // Remove number prefix and underscore
        .replace(/-/g, ' '),      // Replace dashes with spaces
      size: getImageSize(r(key))
    }));
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
    <main className="pixel-art">
      <div className="container pixel-art-container">
        <header className="pixel-art-header">
          <h1>Pixel Art Gallery</h1>
          <p>
            A small collection of my pixel art hobby projects. I'm just starting out and learning, 
            but I enjoy creating these little digital drawings in my free time.
          </p>
          <FaPalette className="pixel-art-icon" />
        </header>

        <motion.div 
          className="pixel-art-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`pixel-art-item ${image.size}`}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImage(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedImage(image);
                }
              }}
            >
              <div className="pixel-art-image-wrapper">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="pixel-art-image"
                />
                <div className="pixel-art-overlay">
                  <h3>{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {images.length === 0 && (
          <div className="no-results">
            <p>No pixel art images found in the gallery.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="pixel-art-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="pixel-art-modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="pixel-art-modal-image"
              />
              <h2>{selectedImage.title}</h2>
              <button 
                className="pixel-art-modal-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

// Helper function to determine image size class
const getImageSize = (src) => {
  const img = new Image();
  img.src = src;
  
  // Get natural dimensions
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  const ratio = width / height;
  
  // Determine size based on dimensions
  if (ratio >= 1.8) return 'wide';     // 1x2 layout
  if (ratio <= 0.6) return 'tall';     // 2x1 layout
  if (width >= 200 && height >= 200) return 'large';  // 2x2 layout for large images
  return '';  // 1x1 layout for regular images
};

export default transition(PixelArt); 