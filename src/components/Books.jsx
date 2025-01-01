import React, { useState, useEffect } from "react";
import "../styles/Books.css";
import { FaSearch, FaSpinner } from "react-icons/fa";
import transition from "../transition";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="books">
      <div className="container books-container">
        <header className="books-header">
          <h1 className="books-title">My Reading List</h1>
          <p className="books-subtitle">
            A collection of books that have shaped my perspective
          </p>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search my books..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <FaSpinner className="loading-spinner" />
            <p>Loading books...</p>
          </div>
        ) : (
          <div className="books-grid">
            {filteredBooks.map((book, index) => (
              <article key={index} className="book-card">
                <div className="book-content">
                  <div className="book-cover-container">
                    <img
                      src={book.image || `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                      alt={`Cover of ${book.title}`}
                      className="book-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200x300?text=No+Cover";
                      }}
                    />
                  </div>
                  <div className="book-info">
                    <h2 className="book-title">
                      {book.link ? (
                        <a 
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {book.title}
                        </a>
                      ) : (
                        book.title
                      )}
                    </h2>
                    <p className="book-author">by {book.author}</p>
                    {book.publisher && (
                      <p className="book-publisher">{book.publisher}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div className="no-results">
            <p>No books found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default transition(Books);
