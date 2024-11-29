import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home d-flex flex-column justify-content-center align-items-center">
      <h2 className="welcome-message text-center">Hello There!</h2>
      <h1 className="welcome-message text-center">
        I'm <span className="home-name">Yunus Emre Bayraktar</span>
      </h1>
      <h1 className="welcome-message text-center">Software Developer</h1>
    </div>
  );
};

export default Home;
