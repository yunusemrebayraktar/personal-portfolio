import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { LINKS } from "./Constants";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-header py-2 d-flex align-items-center">
      <nav className="container d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <h1 className="name m-0">Yunus Emre Bayraktar</h1>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/" className="navigation-link mx-2">Home</Link>
          <Link to="/about" className="navigation-link mx-2">About Me</Link>
          <Link to="/books" className="navigation-link mx-2">Books</Link>
          <Link to="/poems" className="navigation-link mx-2">Poems</Link>
          <Link to="/contact" className="navigation-link mx-2">Contact</Link>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="navigation-link">
            <FaLinkedin className="icon-header" />
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="navigation-link">
            <FaGithub className="icon-header" />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
