import React from "react";
import "../styles/Poems.css";
import { processPoemContent } from "../utils/processPoem";
import poemsData from "../data/poemsData.json";
import transition from "../transition";
import { useNavigate } from "react-router-dom";

const Poems = () => {
  const navigate = useNavigate();

  const handleReadMore = (title) => {
    // Navigate to a unique page for the poem using the lowercase title
    navigate(`/poem/${title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="poems">
      <div className="poems-container">
        <h1 className="note text-center mb-0 pt-3">Poems</h1>
        <div className="line my-3 py-auto"></div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ">
          {poemsData.map((poem) => (
            <div className="col text-center pb-3 card-container" key={poem.title}>
              <div className="poem-card">
                <h5>{poem.title}</h5>
                <p
                  className="pt-2"
                  dangerouslySetInnerHTML={{
                    __html: processPoemContent(poem.poem),
                  }}
                ></p>
                <button
                  className="button mt-auto"
                  onClick={() => handleReadMore(poem.title)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default transition(Poems);
