import React, { useState } from 'react';
import API from './api';

export default function AdminAddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: '',
    description: '',
    quantity: '',
    image: null,
  });

  const handleChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const res = await API.post('/addbook', data);
      alert("📚 Book added successfully!");
    } catch (err) {
      alert("❌ Error adding book");
      console.error(err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #74ebd5, #acb6e5);
          margin: 0;
          padding: 0;
        }

        .form-container {
          max-width: 600px;
          margin: 80px auto;
          padding: 40px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }

        .form-container form {
          display: flex;
          flex-direction: column;
        }

        .form-container input,
        .form-container textarea {
          padding: 12px 15px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 1rem;
        }

        .form-container textarea {
          resize: none;
          height: 100px;
        }

        .form-container button {
          padding: 12px;
          background: linear-gradient(to right, #36d1dc, #5b86e5);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.3s ease;
        }

        .form-container button:hover {
          background: linear-gradient(to right, #2b9abf, #4c6be7);
          transform: scale(1.03);
        }

        @media (max-width: 768px) {
          .form-container {
            margin: 40px 20px;
            padding: 25px;
          }

          .form-container h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="form-container">
        <h2>📖 Add a New Book</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </>
  );
}
