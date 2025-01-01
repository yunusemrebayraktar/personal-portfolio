import React from "react";
import PropTypes from 'prop-types';

const BookCard = ({ title, author, cover }) => {
  return (
    <div className="col text-center pb-3 d-flex justify-content-center">
      <div 
        className="card h-100 d-flex border-0"
        role="article"
        aria-label={`Book: ${title} by ${author}`}
      >
        <div className="d-flex justify-content-center py-2 px-auto card-image-container">
          <img
            src={cover}
            className="card-img"
            alt={`Cover of ${title}`}
            loading="lazy"
            style={{ width: "160px", objectFit: "cover" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle">{author}</h6>
        </div>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default BookCard;
