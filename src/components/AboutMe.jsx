import React from "react";
import "../styles/AboutMe.css";
import profile from "../assets/profile.png";
import transition from "../transition";

const AboutMe = () => {
  return (
    <div className="about-me-container d-flex flex-column align-items-center">
      <div className="about-me-header">
        <h1>About Me</h1>
      </div>
      <div className="about-me-content d-flex align-items-start">
        <div className="about-me-image">
          <img src={profile} className="about-me-photo" />
        </div>
        <div className="about-me-text">
          <p>
            Hello! My name is{" "}
            <span className="highlight"> Yunus Emre Bayraktar</span>. I am a
            passionate
            <span className="highlight"> Web-Dev</span> with a strong interest
            in
            <span className="highlight">
              {" "}
              creating applications with LLM based backend and react.js for
              frontend development
            </span>
            . I thrive on tackling challenges and constantly learning new skills
            to improve my craft. I aim to create meaningful solutions that
            positively impact the world.
          </p>
          <p>
            My journey started in<span className="highlight"> Istanbul</span>,
            where I studied at{" "}
            <span className="highlight"> Istanbul Technical University</span>.
            Over time, I’ve honed my skills in{" "}
            <span className="highlight"> React.js</span> and contributed to
            development of
            <span className="highlight">
              {" "}
              DigiNanny portfolio website and mobile app.
            </span>
            .
          </p>
          <p>
            When I'm not working, you’ll likely find me{" "}
            <span className="highlight">
              playing and creating games, doing pixel-art, reading books
            </span>{" "}
            or exploring new opportunities for personal growth. Feel free to
            explore my portfolio and get in touch!
          </p>
        </div>
      </div>
    </div>
  );
};

export default transition(AboutMe);
