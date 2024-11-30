import React, { useState, useEffect } from "react";
import BookCard from "./BookCard.jsx";
import books from "../data/bookData.js";
import "../styles/Books.css";
import transition from "../transition";

const Books = () => {
  const [bookCovers, setBookCovers] = useState([]);

  useEffect(() => {
    // Fetch the book covers from Open Library API using the ISBN
    const fetchBookCovers = async () => {
      const updatedBooks = await Promise.all(
        books.map(async (book) => {
          const response = await fetch(
            `https://openlibrary.org/api/books?bibkeys=ISBN:${book.isbn}&format=json&jscmd=data`
          );
          const data = await response.json();
          const coverUrl = data[`ISBN:${book.isbn}`]?.cover?.large;

          return {
            ...book,
            cover: coverUrl || "https://via.placeholder.com/150", // Fallback if no cover found
          };
        })
      );
      setBookCovers(updatedBooks);
    };

    fetchBookCovers();
  }, []);

  return (
    <div className="books container">
      <h3 className="note text-center mt-3 mb-0 pt-3">
        List of Books I've Read So Far. A Library to Myself.
      </h3>
      <div className="line my-3 py-auto"></div>
      <div className="d-flex justify-content-center align-items center">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">
          {bookCovers.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              author={book.author}
              cover={book.cover} // Use the dynamically fetched cover
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default transition(Books);
