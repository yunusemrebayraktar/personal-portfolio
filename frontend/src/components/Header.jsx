import React from 'react';
import '../styles/Header.css';
import { Link, NavLink } from 'react-router-dom';
import { LINKS } from "./Constants";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <nav className="container nav-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1 className="logo-text">Yunus Emre Bayraktar</h1>
          </Link>
        </div>
        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            About Me
          </NavLink>
          <NavLink 
            to="/books" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Books
          </NavLink>
          <NavLink 
            to="/poems" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Poems
          </NavLink>
          <NavLink 
            to="/pixel-art" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Pixel Art
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Contact
          </NavLink>
          <div className="social-links">
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
