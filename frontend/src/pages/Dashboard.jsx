"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Dashboard.css"

// Dashboard Components
import DashboardOverview from "../components/dashboard/DashboardOverview"
import UserCrops from "../components/dashboard/UserCrops"
import UserTasks from "../components/dashboard/UserTasks"

const API_URL = "http://localhost:5000/api"

const Dashboard = () => {
  const { currentUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Extract the active tab from the URL path
    const path = location.pathname.split("/").pop()
    if (path && path !== "dashboard") {
      setActiveTab(path)
    } else if (location.pathname === "/dashboard") {
      setActiveTab("overview")
    }
  }, [location.pathname])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    navigate(`/dashboard/${tab === "overview" ? "" : tab}`)
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">Welcome, {currentUser?.fullName || "Farmer"}</h1>
          <p className="dashboard-subtitle">
            Here's an overview of your farm activities, tasks, and important information.
          </p>
        </div>
      </div>

      <div className="container dashboard-content">
        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => handleTabClick("overview")}
          >
            Overview
          </button>
          <button
            className={`dashboard-tab ${activeTab === "crops" ? "active" : ""}`}
            onClick={() => handleTabClick("crops")}
          >
            My Crops
          </button>
          <button
            className={`dashboard-tab ${activeTab === "tasks" ? "active" : ""}`}
            onClick={() => handleTabClick("tasks")}
          >
            Tasks
          </button>
        </div>

        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/crops/*" element={<UserCrops />} />
          <Route path="/tasks/*" element={<UserTasks />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
