import React from "react";
import { LINKS } from "./Constants";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container d-flex flex-column justify-content-center align-items-center gap-4">
      <h1 className="contact-heading text-center my-0">Reach Me Via</h1>
      <div className="contact-links">
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
          <FaLinkedin size={40} />
        </a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="contact-link">
          <FaGithub size={40} />
        </a>
        <a href={LINKS.email} className="contact-link">
          <FaEnvelope size={40} />
        </a>
      </div>
    </div>
  );
};

export default Contact;
