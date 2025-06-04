"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import weatherForecast from "../../data/weatherForecast"

const API_URL = "http://localhost:5000/api"

const DashboardOverview = () => {
  const [userCrops, setUserCrops] = useState([])
  const [userTasks, setUserTasks] = useState([])
  const [marketTrends, setMarketTrends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currentUser, getAuthHeaders } = useAuth()

  useEffect(() => {
    if (currentUser) {
      fetchDashboardData()
    }
  }, [currentUser])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const userId = currentUser.id || currentUser._id
      console.log("Fetching dashboard data for user:", userId)

      // Fetch user-specific data
      const [cropsResponse, tasksResponse, marketResponse] = await Promise.all([
        axios.get(`${API_URL}/user-crops/user/${userId}`, {
          headers: getAuthHeaders(),
        }),
        axios.get(`${API_URL}/tasks/user/${userId}`, {
          headers: getAuthHeaders(),
        }),
        axios.get(`${API_URL}/market-trends`, {
          headers: getAuthHeaders(),
        }),
      ])

      setUserCrops(cropsResponse.data || [])
      setUserTasks(tasksResponse.data || [])
      setMarketTrends(marketResponse.data || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Failed to load dashboard data. Please try again.")

      // For demo purposes, load from local data if API fails
      import("../../data/userCrops").then((module) => setUserCrops(module.default))
      import("../../data/tasks").then((module) => setUserTasks(module.default))
      import("../../data/marketTrends").then((module) => setMarketTrends(module.default))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  // Filter tasks that are pending or in progress
  const pendingTasks = userTasks.filter((task) => task.status !== "Completed")

  // Get crops that are currently growing
  const growingCrops = userCrops.filter((crop) => crop.status === "Growing")

  // Get the latest market trends
  const latestMarketTrends = marketTrends.slice(0, 3)

  return (
    <div className="dashboard-overview">
      <div className="overview-header">
        <h2>Welcome back, {currentUser.name || "Farmer"}!</h2>
        <p>Here's an overview of your farm activities and important information.</p>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <h3>Your Crops</h3>
          <div className="overview-stats">
            <div className="stat">
              <span className="stat-value">{userCrops.length}</span>
              <span className="stat-label">Total Crops</span>
            </div>
            <div className="stat">
              <span className="stat-value">{userCrops.filter((crop) => crop.status === "Growing").length}</span>
              <span className="stat-label">Growing</span>
            </div>
            <div className="stat">
              <span className="stat-value">{userCrops.filter((crop) => crop.status === "Harvested").length}</span>
              <span className="stat-label">Harvested</span>
            </div>
          </div>
          {growingCrops.length > 0 ? (
            <div className="overview-list">
              <h4>Currently Growing</h4>
              <ul>
                {growingCrops.slice(0, 3).map((crop) => (
                  <li key={crop._id || crop.id}>
                    <span className="crop-name">{crop.name}</span>
                    <span className="crop-info">
                      Planted: {crop.plantingDate} | Harvest: {crop.harvestDate}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-data-message">No crops currently growing.</p>
          )}
        </div>

        <div className="overview-card">
          <h3>Upcoming Tasks</h3>
          <div className="overview-stats">
            <div className="stat">
              <span className="stat-value">{pendingTasks.length}</span>
              <span className="stat-label">Pending Tasks</span>
            </div>
            <div className="stat">
              <span className="stat-value">{pendingTasks.filter((task) => task.priority === "High").length}</span>
              <span className="stat-label">High Priority</span>
            </div>
          </div>
          {pendingTasks.length > 0 ? (
            <div className="overview-list">
              <h4>Tasks Due Soon</h4>
              <ul>
                {pendingTasks.slice(0, 3).map((task) => (
                  <li key={task._id || task.id}>
                    <span className={`task-priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                    <span className="task-name">{task.title}</span>
                    <span className="task-due">Due: {task.dueDate}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-data-message">No pending tasks.</p>
          )}
        </div>

        <div className="overview-card">
          <h3>Weather Forecast</h3>
          <div className="weather-forecast">
            {weatherForecast.slice(0, 3).map((day) => (
              <div key={day.date} className="weather-day">
                <div className="weather-date">{day.date}</div>
                <div className="weather-icon">
                  <img src={day.icon || "/placeholder.svg"} alt={day.condition} />
                </div>
                <div className="weather-temp">
                  <span className="high">{day.highTemp}°</span>
                  <span className="low">{day.lowTemp}°</span>
                </div>
                <div className="weather-condition">{day.condition}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="overview-card">
          <h3>Market Trends</h3>
          {latestMarketTrends.length > 0 ? (
            <div className="market-trends">
              {latestMarketTrends.map((trend) => (
                <div key={trend._id || trend.id} className="market-trend">
                  <div className="trend-crop">{trend.crop}</div>
                  <div className="trend-price">
                    <span className="price">${trend.currentPrice}/unit</span>
                    <span className={`price-change ${trend.priceChange > 0 ? "up" : "down"}`}>
                      {trend.priceChange > 0 ? "+" : ""}
                      {trend.priceChange}%
                    </span>
                  </div>
                  <div className="trend-forecast">{trend.forecast}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data-message">No market trends available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
