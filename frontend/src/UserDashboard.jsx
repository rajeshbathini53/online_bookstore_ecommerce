import React, { useEffect, useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [takenBookIds, setTakenBookIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const fetchTakenBookIds = async () => {
    try {
      const res = await API.get('/my-taken-books');
      setTakenBookIds(res.data);
    } catch (err) {
      console.error("Error fetching taken book IDs:", err);
    }
  };

  const handleTakeBook = async (bookId) => {
    try {
      await API.post('/takebook', { bookId });
      alert("Book taken successfully!");
      setTakenBookIds(prev => [...prev, bookId]);
    } catch (err) {
      if (err.response?.data?.message === "You have already taken this book") {
        alert("You've already taken this book.");
      } else {
        alert("Failed to take book");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  useEffect(() => {
    fetchBooks();
    fetchTakenBookIds();
  }, []);

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          margin: 0;
          background: linear-gradient(135deg, #f2f6ff, #e4ecff);
        }

        .dashboard-container {
          padding: 30px;
          max-width: 1200px;
          margin: auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .title {
          font-size: 2rem;
          color: #2c3e50;
        }

        .logout-button {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 10px 18px;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .logout-button:hover {
          background-color: #b02a37;
        }

        .search-bar {
          width: 100%;
          max-width: 400px;
          padding: 10px;
          margin-bottom: 30px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 1rem;
        }

        .books-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
        }

        .book-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 300px;
          transition: transform 0.2s;
        }

        .book-card:hover {
          transform: translateY(-5px);
        }

        .book-card h3 {
          margin: 0 0 10px;
          color: #0d6efd;
        }

        .book-card p {
          margin: 5px 0;
          color: #555;
        }

        .book-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
          margin-top: 10px;
        }

        .take-button {
          margin-top: 12px;
          width: 100%;
          padding: 10px;
          background-color: #198754;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        .take-button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .book-card {
            width: 100%;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="header">
          <h2 className="title">📚 Available Books</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        <input
          className="search-bar"
          type="text"
          placeholder="🔍 Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredBooks.length === 0 ? (
          <p>No matching books found</p>
        ) : (
          <div className="books-grid">
            {filteredBooks.map(book => (
              <div key={book._id} className="book-card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Subject:</strong> {book.subject}</p>
                <p>{book.description}</p>
                {book.image && (
                  <img
                    src={`http://localhost:5000/uploads/${book.image}`}
                    alt={book.title}
                  />
                )}
                <button
                  onClick={() => handleTakeBook(book._id)}
                  disabled={takenBookIds.includes(book._id)}
                  className="take-button"
                >
                  {takenBookIds.includes(book._id) ? "Taken" : "Take Book"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
