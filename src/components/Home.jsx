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
    <div>
      <div className="hero-section d-flex flex-column align-items-center justify-content-center">
        <div className="profile-image-container">
          <img
            src={profile}
            alt="Yunus Emre Bayraktar"
            className="profile-image"
          />
        </div>
        <div className="intro-text text-center">
          <h1 className="home-name">Yunus Emre Bayraktar</h1>
          <h2 className="job-title">Software Developer</h2>
        </div>
      </div>

      <div className="skills-section">
        <h2 className="section-title">Skills</h2>
        <div className="separator-line"></div>
        <ul className="skills-list d-flex justify-content-center gap-2 m-0 p-0">
          <li>
            <FaHtml5 size="3em" />
            <p>HTML 5</p>
          </li>
          <li>
            <FaCss3Alt size="3em" />
            <p>CSS 3</p>
          </li>
          <li>
            <FaJsSquare size="3em" />
            <p>JavaScript</p>
          </li>
          <li>
            <FaReact size="3em" />
            <p>React</p>
          </li>
          <li>
            <FaPython size="3em" />
            <p>Python</p>
          </li>
          <li>
            <FaPhp size="3em" />
            <p>PHP</p>
          </li>
          <li>
            <FaBootstrap size="3em" />
            <p>Bootstrap</p>
          </li>
          <li>
            <FaDatabase size="3em" />
            <p>SQL</p>
          </li>
        </ul>
      </div>

      <div className="history-section">
        <h2 className="section-title">Work & Education</h2>
        <div className="separator-line"></div>
        <div className="history-item">
          <h3>Software Engineer at Epsilon Technology</h3>
          <p>June 2023 - Present</p>
          <p>
            Working with HTML, CSS, and PHP to develop and maintain web
            applications.
          </p>
        </div>
        <div className="history-item">
          <h3>Bachelor's Degree in Computer Engineering</h3>
          <p>Istanbul Technical University, 2020 - 2024 (Expected)</p>
        </div>
      </div>
    </div>
  );
};

export default transition(Home);
