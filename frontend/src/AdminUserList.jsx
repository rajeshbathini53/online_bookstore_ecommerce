import React, { useEffect, useState } from 'react';
import API from './api';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState({ show: false, message: '', success: true });

  const showPopup = (message, success = true) => {
    setPopup({ show: true, message, success });
    setTimeout(() => setPopup({ show: false, message: '', success: true }), 3000);
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await API.get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      showPopup("Failed to fetch users", false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await API.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showPopup("User deleted successfully");
      fetchUsers();
    } catch (err) {
      showPopup("Failed to delete user", false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
     <style>{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: #e0f7fa;
}

.admin-container {
  padding: 50px 20px;
  min-height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

h2 {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 40px;
  color:rgb(35, 2, 2);
  text-shadow: 2px 2px 10px #00f0ff66;
  letter-spacing: 1px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

th, td {
  padding: 20px;
  text-align: left;
  font-size: 1rem;
  color:rgb(2, 23, 26);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  background: rgba(0, 0, 0, 0.3);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color:rgb(1, 9, 9);
}

tbody tr {
  transition: background 0.3s ease;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.08);
}

button {
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  border: none;
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 0.95rem;
  box-shadow: 0 4px 10px rgba(255, 65, 108, 0.4);
}

button:hover {
  background: linear-gradient(to right, #ff1b5e, #ff6a00);
  transform: scale(1.08);
  box-shadow: 0 6px 15px rgba(255, 65, 108, 0.6);
}

.popup-notification {
  position: fixed;
  top: 30px;
  right: 30px;
  background-color: var(--popup-bg);
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  font-weight: 600;
  animation: popupFade 3s ease forwards;
  z-index: 10000;
  font-size: 1rem;
  letter-spacing: 0.5px;
}

.popup-success { --popup-bg: #28a745; }
.popup-error { --popup-bg: #dc3545; }

@keyframes popupFade {
  0%   { opacity: 0; transform: translateY(-10px); }
  10%  { opacity: 1; transform: translateY(0); }
  90%  { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}

@media (max-width: 768px) {
  th, td {
    font-size: 14px;
    padding: 12px;
  }

  button {
    font-size: 13px;
    padding: 8px 12px;
  }

  h2 {
    font-size: 2rem;
  }
}

`}</style>


      <div className="admin-container">
        <h2>All Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => handleDelete(u._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup notification */}
      {popup.show && (
        <div className={`popup-notification ${popup.success ? 'popup-success' : 'popup-error'}`}>
          {popup.message}
        </div>
      )}
    </>
  );
}
