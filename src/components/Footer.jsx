import React from "react";
import "../styles/Footer.css";
import { LINKS } from "./Constants";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <p className="copyright mb-0">&copy; 2024 Yunus Emre Bayraktar</p>
          <div>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaLinkedin className="icon-footer" />
            </a>
            <a
              href={LINKS.github}
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
