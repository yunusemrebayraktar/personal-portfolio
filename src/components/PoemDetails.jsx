import React from "react";
import { useParams } from "react-router-dom";
import poemsData from "../data/poemsData.json";
import { processPoemContent } from "../utils/processPoem";
import transition from "../transition";
import "../styles/PoemDetails.css";

const PoemDetail = () => {
  const { title } = useParams(); // Get the lowercase poem title from the URL
  const poem = poemsData.find(
    (poem) => poem.title.toLowerCase().replace(/\s+/g, "-") === title
  ); // Find the poem by the lowercase title

  if (!poem) {
    return <div>Poem not found</div>;
  }

  return (
    <div className="poem-detail">
      <div className="poem-container">
        <h1>{poem.title}</h1>
        <div
          className="poem-content"
          dangerouslySetInnerHTML={{
            __html: processPoemContent(poem.poem),
          }}
        ></div>
      </div>
    </div>
  );
};

export default transition(PoemDetail);
