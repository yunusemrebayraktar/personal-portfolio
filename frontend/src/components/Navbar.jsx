import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-brand">
          Yunus Emre Bayraktar
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/books" className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}>
            Books
          </Link>
          <Link to="/poems" className={`nav-link ${location.pathname === '/poems' ? 'active' : ''}`}>
            Poems
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 