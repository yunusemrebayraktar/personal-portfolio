import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import "../styles/Books.css";
import transition from "../transition";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 12;

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setBooks(filtered);
    } else {
      fetchBooks(1);
    }
  }, [searchQuery]);

  const fetchBooks = async (page) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching books from backend... (Page ${page})`);
      const response = await fetch(`http://localhost:8000/api/books?page=${page}&per_page=${booksPerPage}`);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received books:", data);
      
      if (!data.books || !Array.isArray(data.books)) {
        throw new Error("Received data is not in the expected format!");
      }

      setBooks(data.books);
      setTotalBooks(data.total);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="books-loading">
        <div className="loading-spinner"></div>
        <p>Loading books from backend...</p>
        <p className="loading-subtitle">Connecting to http://localhost:8000/books</p>
      </div>
    );
  }

  if (error) {
    return (
      <main className="books">
        <div className="books-container">
          <div className="books-error">
            <h2>Error Loading Books</h2>
            <p>{error}</p>
            <div className="error-details">
              <p>Please check:</p>
              <ul>
                <li>Backend server is running at http://localhost:8000</li>
                <li>The books.db file exists in the backend directory</li>
                <li>The SQLite database has been populated by running the scraper</li>
              </ul>
              <button onClick={fetchBooks} className="retry-button">
                Retry Loading Books
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="books">
      <div className="books-container">
        <header className="books-header">
          <h1 className="books-title">My Reading List</h1>
          <p className="books-subtitle">
            A curated collection of books that have shaped my journey
          </p>
          <div className="search-container">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </header>

        {books.length === 0 ? (
          <div className="no-books-message">
            <h2>No Books Found</h2>
            <p>The database appears to be empty. Please ensure:</p>
            <ul>
              <li>The books.db file exists in the backend directory</li>
              <li>The scraper has been run to populate the database</li>
              <li>The books table in SQLite has been created properly</li>
            </ul>
          </div>
        ) : (
          <>
            <div className="books-grid">
              {books.map((book, index) => (
                <motion.div
                  key={book.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="book-card"
                >
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="book-link">
                    <div className="book-image-wrapper">
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="book-image"
                        onError={(e) => {
                          console.error(`Error loading image for book: ${book.title}`);
                          e.target.src = 'placeholder-book.jpg';
                        }}
                      />
                    </div>
                    <div className="book-info">
                      <h2 className="book-title">{book.title}</h2>
                      <div className="book-details">
                        <p className="book-author">{book.author}</p>
                        {book.publisher && (
                          <p className="book-publisher">{book.publisher}</p>
                        )}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {currentPage > 1 && (
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="pagination-button"
                    aria-label="Previous page"
                  >
                    ←
                  </button>
                )}
                
                {Array.from({ length: totalPages }).map((_, index) => {
                  if (
                    index === 0 ||
                    index === totalPages - 1 ||
                    (index >= currentPage - 2 && index <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        aria-label={`Page ${index + 1}`}
                        aria-current={currentPage === index + 1 ? 'page' : undefined}
                      >
                        {index + 1}
                      </button>
                    );
                  } else if (
                    index === currentPage - 3 ||
                    index === currentPage + 3
                  ) {
                    return <span key={index} className="pagination-ellipsis">•••</span>;
                  }
                  return null;
                })}

                {currentPage < totalPages && (
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="pagination-button"
                    aria-label="Next page"
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default transition(Books);
