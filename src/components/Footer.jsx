import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer pt-3 pb-4">
      <div className="container">
        <hr className="footer-line pb-1" />
        <div className="d-flex justify-content-between align-items-center">
          <p className="copyright mb-0">&copy; 2024 Yunus Emre Bayraktar</p>
          <div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaLinkedin className="icon-footer" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaGithub className="icon-footer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
