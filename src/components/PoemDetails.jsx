import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import poemsData from "../data/poemsData.json";
import "../styles/PoemDetails.css";
import transition from "../transition";

const PoemDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const poem = poemsData.find(p => p.title === decodeURIComponent(title));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!poem) {
    return (
      <div className="poem-not-found">
        <h1>Poem not found</h1>
        <button onClick={() => navigate('/poems')} className="back-button">
          Return to Poems
        </button>
      </div>
    );
  }

  return (
    <main className="poem-details">
      <div className="container poem-details-container">
        <button onClick={() => navigate('/poems')} className="back-button">
          <FaArrowLeft /> Back to Poems
        </button>

        <article className="poem-content">
          <header className="poem-header">
            <h1 className="poem-title">{poem.title}</h1>
          </header>

          <div className="poem-text">
            {poem.poem.split('\n').map((line, index, array) => (
              <p 
                key={index} 
                className={`poem-line ${index === array.length - 1 ? 'poem-author-date' : ''}`}
              >
                {line}
              </p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
};

export default transition(PoemDetails);
