import React from "react";
import "../styles/WorkEd.css";
import transition from "../transition";

const WorkEd = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-4 work-ed">
      <h1 className="text-center my-0">Work & Education History</h1>
      <p>Details about my work and education</p>
    </div>
  );
};

export default transition(WorkEd);
