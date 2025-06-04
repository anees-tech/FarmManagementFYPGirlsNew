"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import SearchBar from "./SearchBar"
import "./Navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cropDropdownOpen, setCropDropdownOpen] = useState(false)
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false)
  const { currentUser, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const cropDropdownRef = useRef(null)
  const infoDropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const toggleCropDropdown = (e) => {
    e.preventDefault()
    setCropDropdownOpen((prev) => !prev)
    setInfoDropdownOpen(false)
  }
  const toggleInfoDropdown = (e) => {
    e.preventDefault()
    setInfoDropdownOpen((prev) => !prev)
    setCropDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cropDropdownRef.current && !cropDropdownRef.current.contains(event.target)) {
        setCropDropdownOpen(false)
      }
      if (infoDropdownRef.current && !infoDropdownRef.current.contains(event.target)) {
        setInfoDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          FarmConnect
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-icon-bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon-bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon-bar ${menuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          {/* Show Crop Management to all users, but only admin can modify */}
          <li className="navbar-item dropdown" ref={cropDropdownRef}>
            <a href="#" className="navbar-link" onClick={toggleCropDropdown}>
              Crop Management <i className={`fas fa-chevron-down ${cropDropdownOpen ? "rotate" : ""}`}></i>
            </a>
            <ul className={`dropdown-menu ${cropDropdownOpen ? "show" : ""}`}>
              <li>
                <Link to="/crop-management" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                  Crop Dashboard
                </Link>
              </li>
              <li>
                <Link to="/irrigation-guide" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                  Irrigation Guide
                </Link>
              </li>
              <li>
                <Link to="/weather-tips" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                  Weather Tips
                </Link>
              </li>
              
            </ul>
          </li>

          <li className="navbar-item">
            <Link to="/market-info" className="navbar-link" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-chart-line"></i>
              Market Info
            </Link>
          </li>

          <li className="navbar-item dropdown" ref={infoDropdownRef}>
            <a href="#" className="navbar-link" onClick={toggleInfoDropdown}>
              Information <i className={`fas fa-chevron-down ${infoDropdownOpen ? "rotate" : ""}`}></i>
            </a>
            <ul className={`dropdown-menu ${infoDropdownOpen ? "show" : ""}`}>
              <li>
                <Link to="/market-trends" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                  Market Trends
                </Link>
              </li>
              <li>
                <Link to="/news-events" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                  News & Events
                </Link>
              </li>
              <li>
                <Link to="/support" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                  Support
                </Link>
              </li>
            </ul>
          </li>

          <li className="navbar-item">
            <Link to="/contact" className="navbar-link" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>

          {currentUser ? (
            <>
              {/* Show appropriate dashboard based on user role */}
              <li className="navbar-item">
                <Link to={isAdmin ? "/admin" : "/dashboard"} className="navbar-link" onClick={() => setMenuOpen(false)}>
                  {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-button" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}

          {/* <li className="navbar-item search-item">
            <SearchBar />
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
