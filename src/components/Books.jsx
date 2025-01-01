import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loading from './Loading';
import '../styles/Books.css';

const Books = () => {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBookList(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>{error}</h3>
          <button className="retry-button" onClick={fetchBooks}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="books">
      <div className="container books-container">
        <header className="books-header">
          <h1 className="books-title">My Reading List</h1>
          <p className="books-subtitle">
            A collection of books that have shaped my perspective
          </p>
        </header>

        <div className="books-grid">
          {bookList.map((book, idx) => (
            <motion.article
              key={idx}
              className="book-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="book-content">
                <div className="book-cover-container">
                  <img
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    className="book-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200x300?text=No+Cover";
                    }}
                  />
                </div>
                <div className="book-info">
                  <h2 className="book-title">
                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                      {book.title}
                    </a>
                  </h2>
                  <p className="book-author">by {book.author}</p>
                  {book.publisher && (
                    <p className="book-publisher">{book.publisher}</p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Books;
