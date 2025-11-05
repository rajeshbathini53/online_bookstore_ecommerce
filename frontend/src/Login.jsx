import React, { useState } from 'react';
import API from './api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/myprofile');
    } catch (e) {
      console.log("Login failed", e.response?.data || e.message);
      alert("Invalid Login Credentials");
    }
  };

  return (
    <>
      <style>{`
        .login-container {
          height: 100vh;
          background: 
            linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
            url('https://wallpapercave.com/wp/wp7813019.jpg') no-repeat center center/cover;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-form {
          background-color: rgba(255, 255, 255, 0.96);
          padding: 40px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          text-align: center;
          width: 90%;
          max-width: 360px;
        }

        .login-form h2 {
          margin-bottom: 25px;
          color: #2c3e50;
          font-size: 2rem;
        }

        .login-form input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          transition: border 0.3s ease;
        }

        .login-form input:focus {
          outline: none;
          border-color: #6c63ff;
        }

        .login-form button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(to right, #6c63ff, #5a52d6);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 0 10px #6c63ff88;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .login-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 15px #6c63ffbb;
        }

        .register-link {
          margin-top: 20px;
          display: block;
          color: #2980b9;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .register-link:hover {
          color: #1c5980;
        }
      `}</style>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to Library</h2>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <Link to="/register" className="register-link">
            Don’t have an account? Register here
          </Link>
        </form>
      </div>
    </>
  );
}
