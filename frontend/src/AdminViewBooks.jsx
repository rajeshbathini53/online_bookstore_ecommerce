import React, { useEffect, useState } from 'react';
import API from './api';

export default function AdminViewBooks() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Adjust route as needed
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: url('https://images.unsplash.com/photo-1512820790803-83ca734da794') no-repeat center center fixed;
          background-size: cover;
        }

        .overlay {
          background: rgba(255, 255, 255, 0.95);
          min-height: 100vh;
          padding: 40px 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          max-width: 1300px;
          margin-left: auto;
          margin-right: auto;
        }

        h2 {
          font-size: 2.8rem;
          color: #0d6efd;
          margin: 0;
        }

        .logout-btn {
          background: linear-gradient(to right, #00c6ff, #0072ff);
          border: none;
          color: #fff;
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .logout-btn:hover {
          background: linear-gradient(to right, #0093e9, #0054d1);
        }

        .book-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          max-width: 1300px;
          margin: 0 auto;
        }

        .book-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .book-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .book-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: 20px;
        }

        .book-card h3 {
          font-size: 1.5rem;
          color: #222;
          margin: 0 0 10px;
        }

        .book-card p {
          margin: 6px 0;
          color: #444;
          font-size: 0.96rem;
        }

        .book-card p strong {
          color: #000;
        }

        .book-card button {
          margin-top: auto;
          background: linear-gradient(to right, #ff416c, #ff4b2b);
          border: none;
          color: white;
          padding: 12px 18px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .book-card button:hover {
          background: linear-gradient(to right, #e03c5d, #d63e23);
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2.2rem;
          }

          .logout-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="overlay">
        <div className="header">
          <h2>📚 Library Books</h2>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>

        {books.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>No books found</p>
        ) : (
          <div className="book-grid">
            {books.map(book => (
              <div key={book._id} className="book-card">
                {book.image && (
                  <img
                    src={`http://localhost:5000/uploads/${book.image}`}
                    alt={book.title}
                  />
                )}
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Subject:</strong> {book.subject}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Quantity:</strong> {book.quantity}</p>
                <button onClick={() => deleteBook(book._id)}>🗑️ Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
