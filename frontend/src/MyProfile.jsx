import React, { useEffect, useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/myprofile")
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Access denied", err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        navigate("/admindashboard");
      } else if (user.role === "user") {
        navigate("/userdashboard");
      }
    }
  }, [user, loading, navigate]);

  return (
    <div>
      <h2>My Profile</h2>
      {loading ? <p>Loading...</p> : <p>Unauthorized or no user found.</p>}
    </div>
  );
}
