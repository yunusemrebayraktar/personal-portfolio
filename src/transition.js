import { motion } from "framer-motion";
import React from "react";

const transition = (OgComponent) => {
  return () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ 
        backgroundColor: 'var(--color-background)',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <OgComponent />
    </motion.div>
  );
};

export default transition;
