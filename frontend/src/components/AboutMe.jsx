import React from "react";
import "../styles/AboutMe.css";
import profile from "../assets/profile.png";

const AboutMe = () => {
  return (
    <main className="about-me">
      <div className="container about-container">
        <header className="about-header">
          <h1 className="about-title">About Me</h1>
        </header>
        
        <div className="about-content">
          <div className="about-image-container">
            <img src={profile} alt="Yunus Emre Bayraktar" className="about-image" />
            <div className="image-backdrop"></div>
          </div>
          
          <div className="about-text-content">
            <div className="about-section">
              <h2 className="about-section-title">Who I Am</h2>
              <p className="about-text">
                Hello! I'm <span className="highlight">Yunus Emre Bayraktar</span>, 
                a passionate <span className="highlight">Web Developer</span> with a 
                strong interest in creating applications with LLM based backend and 
                React.js for frontend development.
              </p>
            </div>

            <div className="about-section">
              <h2 className="about-section-title">My Journey</h2>
              <p className="about-text">
                My journey started in <span className="highlight">Istanbul</span>, 
                where I studied at <span className="highlight">Istanbul Technical University</span>. 
                Over time, I've honed my skills in <span className="highlight">React.js</span> and 
                currently working on development of 
                <span className="highlight"> DigiNanny portfolio website and mobile app</span>.
              </p>
            </div>

            <div className="about-section">
              <h2 className="about-section-title">Beyond Coding</h2>
              <p className="about-text">
                When I'm not working, you'll likely find me 
                <span className="highlight"> playing and creating games, doing pixel-art, reading books</span> or 
                exploring new opportunities for personal growth. Feel free to explore 
                my portfolio and get in touch!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutMe;
