"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
import UserCropForm from "./UserCropForm"
import { useAuth } from "../../context/AuthContext"

const API_URL = "http://localhost:5000/api"

const UserCrops = () => {
  const [userCrops, setUserCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { currentUser, getAuthHeaders } = useAuth()

  useEffect(() => {
    if (currentUser) {
      fetchUserCrops()
    }
  }, [currentUser])

  const fetchUserCrops = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching crops for user:", currentUser.id || currentUser._id)

      // Fetch user-specific crops from the API
      const response = await axios.get(`${API_URL}/user-crops/user/${currentUser.id || currentUser._id}`, {
        headers: getAuthHeaders(),
      })

      console.log("User crops response:", response.data)
      setUserCrops(response.data || [])
    } catch (error) {
      console.error("Error fetching user crops:", error)
      setError("Failed to load your crops. Please try again.")

      // For demo purposes, load from local data if API fails
      import("../../data/userCrops").then((module) => {
        setUserCrops(module.default)
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      try {
        await axios.delete(`${API_URL}/user-crops/${id}`, {
          headers: getAuthHeaders(),
        })
        setUserCrops(userCrops.filter((crop) => crop._id !== id))
      } catch (error) {
        console.error("Error deleting crop:", error)
        alert("Failed to delete crop. Please try again.")
      }
    }
  }

  const handleAddCrop = async (cropData) => {
    try {
      // Add user ID to the crop data
      const cropWithUserId = {
        ...cropData,
        user: currentUser.id || currentUser._id,
      }

      console.log("Adding crop with user ID:", cropWithUserId)

      // Create new crop in the backend
      const response = await axios.post(`${API_URL}/user-crops`, cropWithUserId, {
        headers: getAuthHeaders(),
      })

      console.log("Add crop response:", response.data)
      setUserCrops([...userCrops, response.data])
      navigate("/dashboard/crops")
    } catch (error) {
      console.error("Error adding crop:", error.response?.data || error.message)
      alert("Failed to add crop. Please try again.")
    }
  }

  const handleUpdateCrop = async (id, cropData) => {
    try {
      // Update crop in the backend
      const response = await axios.put(`${API_URL}/user-crops/${id}`, cropData, {
        headers: getAuthHeaders(),
      })
      setUserCrops(userCrops.map((crop) => (crop._id === id ? response.data : crop)))
      navigate("/dashboard/crops")
    } catch (error) {
      console.error("Error updating crop:", error)
      alert("Failed to update crop. Please try again.")
    }
  }

  const renderCropsList = () => {
    if (loading) {
      return <div className="loading">Loading your crops...</div>
    }

    if (error) {
      return <div className="error-message">{error}</div>
    }

    return (
      <>
        <div className="section-header">
          <h2>My Crops</h2>
          <button className="btn" onClick={() => navigate("/dashboard/crops/add")}>
            Add New Crop
          </button>
        </div>

        {userCrops.length === 0 ? (
          <div className="no-crops-message">
            <p>You haven't added any crops yet. Start by adding your first crop!</p>
            <button className="btn" onClick={() => navigate("/dashboard/crops/add")}>
              Add Your First Crop
            </button>
          </div>
        ) : (
          <div className="crops-table-container">
            <table className="crops-table">
              <thead>
                <tr>
                  <th>Crop Name</th>
                  <th>Area</th>
                  <th>Planting Date</th>
                  <th>Expected Harvest</th>
                  <th>Season</th>
                  <th>Water Level</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userCrops.map((crop) => (
                  <tr key={crop._id || crop.id}>
                    <td>{crop.name}</td>
                    <td>{crop.area}</td>
                    <td>{crop.plantingDate}</td>
                    <td>{crop.harvestDate}</td>
                    <td>{crop.season}</td>
                    <td>{crop.waterLevel}</td>
                    <td>
                      <span className={`status-badge ${crop.status.toLowerCase()}`}>{crop.status}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn edit"
                          onClick={() => navigate(`/dashboard/crops/edit/${crop._id || crop.id}`)}
                        >
                          Edit
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(crop._id || crop.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="dashboard-crops">
      <Routes>
        <Route path="/" element={renderCropsList()} />
        <Route path="/add" element={<UserCropForm onSubmit={handleAddCrop} />} />
        <Route
          path="/edit/:id"
          element={<UserCropForm userCrops={userCrops} onSubmit={handleUpdateCrop} isEditing />}
        />
      </Routes>
    </div>
  )
}

export default UserCrops
