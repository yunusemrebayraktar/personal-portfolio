import React from "react";
<<<<<<< HEAD
import "../styles/Footer.css";
import { LINKS } from "./Constants";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center">
      <div className="container">
=======
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer pt-3 pb-4">
      <div className="container">
        <hr className="footer-line pb-1" />
>>>>>>> 081e7b7cf4ea8e423553689be10c0899bb8876ba
        <div className="d-flex justify-content-between align-items-center">
          <p className="copyright mb-0">&copy; 2024 Yunus Emre Bayraktar</p>
          <div>
            <a
<<<<<<< HEAD
              href={LINKS.linkedin}
=======
              href="https://www.linkedin.com"
>>>>>>> 081e7b7cf4ea8e423553689be10c0899bb8876ba
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaLinkedin className="icon-footer" />
            </a>
            <a
<<<<<<< HEAD
              href={LINKS.github}
=======
              href="https://github.com"
>>>>>>> 081e7b7cf4ea8e423553689be10c0899bb8876ba
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
