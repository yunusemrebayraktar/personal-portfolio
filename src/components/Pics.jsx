import React from "react";
import "../styles/Pics.css";
import transition from "../transition";

const Pics = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-4 pics">
      <h1 className="text-center my-0">Some Pictures</h1>
    </div>
  );
};

export default transition(Pics);
