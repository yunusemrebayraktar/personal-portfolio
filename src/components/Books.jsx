import React, { useState, useEffect } from "react";
import "../styles/Books.css";
import transition from "../transition";
import { FaSearch } from "react-icons/fa";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const booksPerPage = 12;

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, books]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/books");
      if (response.ok) {
        const data = await response.json();
        // Sort books to show newest first (assuming they're added in order)
        setBooks(data.reverse());
        setFilteredBooks(data.reverse());
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get current books for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="books-loading">
        <div className="loading-spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <main className="books">
      <section className="books-section">
        <div className="container">
          <h1 className="section-title">My Reading List</h1>
          
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

          <div className="books-grid">
            {currentBooks.map((book, index) => (
              <div key={index} className="book-card">
                <div className="book-image-wrapper">
                  <img src={book.image} alt={book.title} className="book-image" />
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <div className="book-details">
                    <p className="book-author">{book.author}</p>
                    <p className="book-publisher">{book.publisher}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length > booksPerPage && (
            <div className="pagination">
              {currentPage > 1 && (
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="pagination-button"
                >
                  ←
                </button>
              )}
              
              {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => {
                // Show first page, last page, and pages around current page
                if (
                  index === 0 ||
                  index === Math.ceil(filteredBooks.length / booksPerPage) - 1 ||
                  (index >= currentPage - 2 && index <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      {index + 1}
                    </button>
                  );
                } else if (
                  index === currentPage - 3 ||
                  index === currentPage + 3
                ) {
                  return <span key={index} className="pagination-ellipsis">...</span>;
                }
                return null;
              })}

              {currentPage < Math.ceil(filteredBooks.length / booksPerPage) && (
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="pagination-button"
                >
                  →
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default transition(Books);
