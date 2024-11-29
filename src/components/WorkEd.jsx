import React from "react";
import { LINKS } from "./Constants";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "../styles/WorkEd.css";

const WorkEd = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-4 work-ed">
      <h1 className="text-center my-0">Work & Education History</h1>
      <p>Details about my work and education</p>
    </div>
  );
};

export default WorkEd;
