import React, { useState } from 'react';
import API from './api';

export default function UploadBooks() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/upload-books', formData);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?fit=crop&w=1950&q=80') no-repeat center center fixed;
          background-size: cover;
        }

        .upload-container {
          max-width: 500px;
          margin: 100px auto;
          background-color: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .upload-title {
          font-size: 1.8rem;
          color: #0d6efd;
          margin-bottom: 25px;
        }

        .file-input {
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .upload-button {
          background-color: #0d6efd;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .upload-button:hover {
          background-color: #084ccf;
        }

        .message {
          margin-top: 20px;
          font-weight: 500;
          color: green;
        }

        @media (max-width: 600px) {
          .upload-container {
            margin: 30px 15px;
            padding: 20px;
          }

          .upload-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="upload-container">
        <h2 className="upload-title">📁 Upload Books via Excel</h2>
        <input
          type="file"
          accept=".xlsx,.xls"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="upload-button" onClick={handleUpload}>
          ⬆️ Upload
        </button>
        {msg && <p className="message">{msg}</p>}
      </div>
    </div>
  );
}
