import React from 'react';
import AdminUserList from './AdminUserList';
import { Link, useNavigate } from 'react-router';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear token or any other auth data
    navigate('/login'); // redirect to login page
  };

  return (
    <div style={styles.page}>
      <style>
        {`
          .navbar {
            background-color: #0d6efd;
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }

          .navbar h1 {
            font-size: 1.8rem;
            margin: 0;
          }

          .logout-btn {
            background-color: #dc3545;
            border: none;
            color: white;
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .logout-btn:hover {
            background-color: #b02a37;
          }

          .admin-btn {
            padding: 15px 25px;
            background-color: #0d6efd;
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-size: 1.1rem;
            transition: 0.3s ease-in-out;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            display: inline-block;
          }

          .admin-btn:hover {
            background-color: #084298;
            transform: scale(1.05);
          }

          .button-group {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin: 40px auto;
            max-width: 1000px;
          }

          .admin-content {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            max-width: 1000px;
            margin: 0 auto;
          }
        `}
      </style>

      {/* NAVBAR */}
      <div className="navbar">
        <h1>📚 Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      {/* BUTTONS */}
      <div className="button-group">
        <Link to="/admin-add-book" className="admin-btn">➕ Add a Book</Link>
        <Link to="/admin-view-books" className="admin-btn">📖 View Books</Link>
        <Link to="/admin-view-takenbooks" className="admin-btn">📋 Users' Taken Books</Link>
        <Link to="/admin-add-excel" className="admin-btn">📤 Upload Excel</Link>
      </div>

      {/* CONTENT */}
      <div className="admin-content">
        <AdminUserList />
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '0px',
    background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
    minHeight: '100vh',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  }
};
