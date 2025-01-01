import React from "react";
import "../styles/Home.css";
import transition from "../transition";
import profile from "../assets/profile.png";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaPython,
  FaPhp,
  FaBootstrap,
  FaDatabase,
} from "react-icons/fa";

const Home = () => {
  return (
    <main className="home">
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="greeting">Hello, I'm</span>
                <span className="name">Yunus Emre Bayraktar</span>
              </h1>
              <h2 className="hero-subtitle">Software Developer</h2>
              <p className="hero-description">
                Passionate about creating applications with LLM based backend and React.js frontend development
              </p>
            </div>
            <div className="hero-image">
              <div className="profile-image-wrapper">
                <img 
                  src={profile} 
                  alt="Yunus Emre Bayraktar" 
                  className="profile-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            {[
              { icon: FaHtml5, name: "HTML5" },
              { icon: FaCss3Alt, name: "CSS3" },
              { icon: FaJsSquare, name: "JavaScript" },
              { icon: FaReact, name: "React" },
              { icon: FaPython, name: "Python" },
              { icon: FaPhp, name: "PHP" },
              { icon: FaBootstrap, name: "Bootstrap" },
              { icon: FaDatabase, name: "SQL" },
            ].map((skill, index) => (
              <div key={index} className="skill-card">
                <skill.icon className="skill-icon" />
                <p className="skill-name">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-section">
        <div className="container">
          <h2 className="section-title">Experience & Education</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-content">
                <h3 className="timeline-title">Software Engineer</h3>
                <p className="timeline-place">Epsilon Technology</p>
                <p className="timeline-date">June 2023 - Present</p>
                <p className="timeline-description">
                  Working with HTML, CSS, and PHP to develop and maintain web applications.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3 className="timeline-title">Computer Engineering</h3>
                <p className="timeline-place">Istanbul Technical University</p>
                <p className="timeline-date">2020 - 2025 (Expected)</p>
                <p className="timeline-description">
                  Bachelor's Degree in Computer Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default transition(Home);
