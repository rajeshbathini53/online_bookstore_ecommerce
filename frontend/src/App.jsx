import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Login'
import Register from './Register'
import MyProfile from './MyProfile'
import UserDashboard from './UserDashboard'
import AdminDashboard from './AdminDashboard'
import ProtectedRoute from './ProtectedRoute'
import AdminAddBook from './AdminAddBook'
import AdminViewBooks from './AdminViewBooks'
import AdminTakenBooks from './AdminTakenBooks'
import UploadBooks from './UploadBooks'

function App() {
return(
<>
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/myprofile' element={<MyProfile />} />
    
    <Route
      path='/userdashboard'
      element={
        <ProtectedRoute allowedRoles={['user']}>
          <UserDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path='/admindashboard'
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
      <Route
      path='/admin-add-book'
      element={
        <ProtectedRoute allowedRoles={['admin']}>
    <AdminAddBook/>
        </ProtectedRoute>
      }
    />
     <Route
      path='/admin-view-books'
      element={
        <ProtectedRoute allowedRoles={['admin']}>
    <AdminViewBooks/>
        </ProtectedRoute>
      }
    />
     <Route
      path='/admin-view-takenbooks'
      element={
        <ProtectedRoute allowedRoles={['admin']}>
    <AdminTakenBooks/>
        </ProtectedRoute>
      }
    />
    <Route
      path='/admin-add-excel'
      element={
        <ProtectedRoute allowedRoles={['admin']}>
    <UploadBooks/>
        </ProtectedRoute>
      }
    />
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
