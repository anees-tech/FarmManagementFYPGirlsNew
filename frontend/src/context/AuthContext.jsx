"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const API_URL = "http://localhost:5000/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authToken, setAuthToken] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("authToken")

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
      setAuthToken(storedToken)

      // Set default auth header for all requests
      if (storedToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials)

      if (response.data.success) {
        const userData = response.data.user
        const token = response.data.token || "dummy-token" // In case backend doesn't provide token yet

        // Ensure user has an ID property
        const userWithId = {
          ...userData,
          id: userData._id || userData.id,
        }

        setCurrentUser(userWithId)
        setAuthToken(token)

        localStorage.setItem("user", JSON.stringify(userWithId))
        localStorage.setItem("authToken", token)

        // Set auth header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData)

      if (response.data.success) {
        // We don't auto-login after registration now
        return true
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setAuthToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    // Remove auth header
    delete axios.defaults.headers.common["Authorization"]
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken")
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    }
  }

  const value = {
    currentUser,
    authToken,
    login,
    register,
    logout,
    loading,
    isAdmin: currentUser?.isAdmin || false,
    getAuthHeaders,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthProvider
