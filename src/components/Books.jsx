import React from "react";
import { LINKS } from "./Constants";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "../styles/Books.css";

const Books = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-4 books">
      <h1 className="text-center my-0">Books I've Read</h1>
      <p>Details about the books I've read</p>
    </div>
  );
};

export default Books;
