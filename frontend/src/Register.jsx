import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from './api';

export default function Register() {
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [popup, setPopup] = useState({ show: false, message: '', success: true });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showPopup = (message, success = true) => {
    setPopup({ show: true, message, success });
    setTimeout(() => setPopup({ show: false, message: '', success: true }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("register", {
        name: formData.uname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      showPopup(res.data.message, true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration Failed";
      showPopup(msg, false);
    }
  };

  return (
    <>
      <style>{`
        .register-container {
          height: 100vh;
          background:
            linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
            url('https://wallpaperaccess.com/full/253418.jpg')
            no-repeat center center/cover;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .register-form {
          background-color: rgba(255, 255, 255, 0.96);
          padding: 40px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          text-align: center;
          width: 90%;
          max-width: 380px;
        }

        .register-form h2 {
          margin-bottom: 25px;
          color: #2c3e50;
          font-size: 2rem;
        }

        .register-form input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          transition: border 0.3s ease;
        }

        .register-form input:focus {
          outline: none;
          border-color: #6c63ff;
        }

        .register-form button {
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

        .register-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 15px #6c63ffbb;
        }

        .login-link {
          margin-top: 20px;
          display: block;
          color: #2980b9;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .login-link:hover {
          color: #1c5980;
        }

        .popup-notification {
          position: fixed;
          top: 30px;
          right: 30px;
          padding: 15px 25px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          animation: popupFade 3s ease forwards;
          z-index: 9999;
          opacity: 0;
          color: white;
        }

        .popup-notification.show {
          opacity: 1;
        }

        .popup-success {
          background-color: #28a745;
        }

        .popup-error {
          background-color: #dc3545;
        }

        @keyframes popupFade {
          0%   { opacity: 0; transform: translateY(-10px); }
          10%  { opacity: 1; transform: translateY(0); }
          90%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type='text'
            name='uname'
            placeholder='Enter Name'
            required
            value={formData.uname}
            onChange={handleChange}
          />
          <input
            type='email'
            name='email'
            placeholder='Enter Email'
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type='submit'>Register</button>
          <Link to="/login" className="login-link">
            Already have an account? Login
          </Link>
        </form>
      </div>

      {popup.show && (
        <div className={`popup-notification ${popup.success ? 'popup-success' : 'popup-error'} show`}>
          {popup.message}
        </div>
      )}
    </>
  );
}
