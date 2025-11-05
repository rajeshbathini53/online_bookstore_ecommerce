import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children,allowedRoles}) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if(!token || !user){
    return <Navigate to='/login' replace/>
  }
  if(!allowedRoles.includes(user.role)){
    console.warn("Unauthorized role:", user.role); 
    return <Navigate to='/' replace/>
  }

    return children;
}
