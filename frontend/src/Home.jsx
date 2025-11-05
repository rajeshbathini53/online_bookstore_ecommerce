import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to right, #e0eafc, #cfdef3)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '40px' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '15px', 
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)', 
        maxWidth: '800px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#2c3e50' }}>
          📚 Welcome to the Online Book Store        </h1>
        <p style={{ fontSize: '1.2rem', color: '#34495e', marginBottom: '30px' }}>
          Explore a world of knowledge at your fingertips. Users can browse and borrow books online, 
          while admins can manage the collection with ease.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '12px 25px',
              fontSize: '1rem',
              backgroundColor: '#2980b9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1c5980'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2980b9'}
          >
            Login
          </button>

          <button 
            onClick={() => navigate('/register')}
            style={{
              padding: '12px 25px',
              fontSize: '1rem',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1e8449'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
          >
            Register
          </button>
        </div>

        <div style={{ marginTop: '40px', fontSize: '1rem', color: '#7f8c8d' }}>
          📖 Whether you're a student, teacher, or book lover, start your reading journey with us today!
        </div>
      </div>
    </div>
  );
}
