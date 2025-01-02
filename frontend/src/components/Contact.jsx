import React from "react";
import { LINKS } from "./Constants";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Contact.css";
import transition from "../transition";

const Contact = () => {
  const contactMethods = [
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      description: "Let's connect professionally",
      link: LINKS.linkedin,
      isExternal: true
    },
    {
      icon: <FaGithub />,
      title: "GitHub",
      description: "Check out my code",
      link: LINKS.github,
      isExternal: true
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: "Get in touch directly",
      link: LINKS.email,
      isExternal: false
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      description: "Istanbul, Turkey",
      link: null,
      isExternal: false
    }
  ];

  return (
    <main className="contact">
      <div className="container contact-container">
        <header className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Feel free to reach out through any of these platforms
          </p>
        </header>

        <div className="contact-grid">
          {contactMethods.map((method, index) => (
            <div key={index} className="contact-card">
              <div className="contact-card-content">
                <div className="contact-icon">{method.icon}</div>
                <h2 className="contact-method-title">{method.title}</h2>
                <p className="contact-method-description">{method.description}</p>
                {method.link && (
                  <a
                    href={method.link}
                    className="contact-link"
                    target={method.isExternal ? "_blank" : undefined}
                    rel={method.isExternal ? "noopener noreferrer" : undefined}
                  >
                    Connect <span className="arrow">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="contact-footer">
          <p className="contact-note">
            Looking forward to connecting with you!
          </p>
        </div>
      </div>
    </main>
  );
};

export default transition(Contact);
