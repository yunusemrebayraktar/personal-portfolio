import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import "../styles/Books.css";
import transition from "../transition";
import { useDebounce } from "../useDebounce";
import Loading from "./Loading";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    // Reset to first page when search query changes and should search is true
    if (shouldSearch) {
      setCurrentPage(1);
      setShouldSearch(false);
    }
  }, [shouldSearch]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const searchParam = searchQuery && shouldSearch ? `&search=${encodeURIComponent(searchQuery)}` : '';
        const url = `http://localhost:8000/api/books?page=${currentPage}${searchParam}`;
        console.log('Fetching books from:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (!data.books || !Array.isArray(data.books)) {
          throw new Error('Received data is not in the expected format');
        }
        
        setBooks(data.books);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Error details:', err);
        setError(
          `Failed to fetch books. Please ensure the backend server is running at http://localhost:8000. Error: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, shouldSearch, searchQuery]);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setShouldSearch(true);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setShouldSearch(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="books">
      <div className="books-container">
        <div className="books-header">
          <h1>Books</h1>
          <div className="search-container">
            <div className="search-wrapper">
              <FaSearch className="search-icon" onClick={handleSearchClick} />
              <input
                type="text"
                placeholder="Search by title, author or publisher..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="books-grid">
          {books.map((book) => (
            <a key={book.id} href={book.link} target="_blank" rel="noopener noreferrer" className="book-link">
              <div className="book-image-wrapper">
                <img src={book.image} alt={book.title} className="book-image" />
              </div>
              <div className="book-info">
                <h2 className="book-title">{book.title}</h2>
                <div className="book-details">
                  <p className="book-author">{book.author}</p>
                  <p className="book-publisher">{book.publisher}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              ←
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              // Show first page, last page, and 2 pages around current page
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 3 ||
                pageNum === currentPage + 3
              ) {
                return <span key={pageNum} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default transition(Books);
