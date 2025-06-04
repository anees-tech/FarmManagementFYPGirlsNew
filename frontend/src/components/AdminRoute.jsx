"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const AdminRoute = ({ children }) => {
  const { currentUser, loading, isAdmin } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" />
  }

  return children
}

export default AdminRoute
