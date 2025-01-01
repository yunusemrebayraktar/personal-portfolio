import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import poemsData from "../data/poemsData.json";
import "../styles/Poems.css";
import transition from "../transition";

const Poems = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPoems = poemsData.filter(poem =>
    poem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="poems">
      <div className="container poems-container">
        <header className="poems-header">
          <h1 className="poems-title">My Poems</h1>
          <p className="poems-subtitle">
            A collection of my thoughts and emotions in verse
          </p>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search poems by title..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="poems-grid">
          {filteredPoems.map((poem, index) => (
            <Link
              to={`/poem/${encodeURIComponent(poem.title)}`}
              key={index}
              className="poem-card"
            >
              <article className="poem-card-content">
                <FaBookOpen className="poem-icon" />
                <h2 className="poem-title">{poem.title}</h2>
                <p className="poem-preview">
                  {poem.poem.split('\n')[0].substring(0, 100)}...
                </p>
                <span className="read-more">
                  Read More <span className="arrow">→</span>
                </span>
              </article>
            </Link>
          ))}
        </div>

        {filteredPoems.length === 0 && (
          <div className="no-results">
            <p>No poems found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default transition(Poems);
