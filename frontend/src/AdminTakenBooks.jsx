import React, { useEffect, useState } from 'react';
import API from './api';

const AdminTakenBooks = () => {
  const [takenBooks, setTakenBooks] = useState([]);

  const fetchTakenBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/all-taken-books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTakenBooks(res.data);
    } catch (error) {
      console.error("Error fetching taken books", error);
    }
  };

  useEffect(() => {
    fetchTakenBooks();
  }, []);

  const handleReturn = async (recordId) => {
    try {
      const token = localStorage.getItem('token');
      await API.put(`/return-book/${recordId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTakenBooks();
    } catch (error) {
      console.error("Error returning book", error);
    }
  };

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fit=crop&w=1950&q=80') no-repeat center center fixed;
          background-size: cover;
        }

        .container {
          max-width: 1000px;
          margin: 50px auto;
          background-color: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        .title {
          text-align: center;
          color: #0d6efd;
          font-size: 2.2rem;
          font-weight: 600;
          margin-bottom: 30px;
        }

        .book-list {
          list-style: none;
          padding: 0;
        }

        .book-item {
          background: #f1f3f8;
          border-left: 6px solid #0d6efd;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          transition: transform 0.3s ease;
        }

        .book-item:hover {
          transform: translateY(-4px);
          background: #e6e9f0;
        }

        .book-item p {
          margin: 6px 0;
          font-size: 1rem;
          color: #333;
        }

        .status.taken {
          color: #28a745;
          font-weight: bold;
        }

        .status.returned {
          color: #6c757d;
        }

        .return-button {
          margin-top: 10px;
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 18px;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .return-button:hover {
          background-color: #218838;
        }

        @media (max-width: 768px) {
          .container {
            margin: 20px;
            padding: 20px;
          }

          .title {
            font-size: 1.7rem;
          }
        }
      `}</style>

      <div className="container">
        <h2 className="title">📚 All Taken Books</h2>
        <ul className="book-list">
          {takenBooks.map((entry) => (
            <li key={entry._id} className="book-item">
              <p><strong>📘 {entry.bookId?.title}</strong> by {entry.bookId?.author}</p>
              <p>👤 Taken by: {entry.userId?.name} ({entry.userId?.email})</p>
              <p>🕒 On: {new Date(entry.takenAt).toLocaleString()}</p>
              <p>
                📌 Status: <span className={`status ${entry.status}`}>{entry.status}</span>
              </p>
              {entry.status === 'taken' && (
                <button className="return-button" onClick={() => handleReturn(entry._id)}>
                  ✅ Mark as Returned
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminTakenBooks;
