"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"
import UserTaskForm from "./UserTaskForm"
import { useAuth } from "../../context/AuthContext"

const API_URL = "http://localhost:5000/api"

const UserTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/tasks`)
      setTasks(response.data || [])
      setError(null)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setError("Failed to load tasks. Please try again.")

      // For demo purposes, load from local data if API fails
      import("../../data/tasks").then((module) => {
        setTasks(module.default)
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${API_URL}/tasks/${id}`)
        setTasks(tasks.filter((task) => task._id !== id))
      } catch (error) {
        console.error("Error deleting task:", error)
        alert("Failed to delete task. Please try again.")
      }
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData)
      setTasks([...tasks, response.data])
      navigate("/dashboard/tasks")
    } catch (error) {
      console.error("Error adding task:", error)
      alert("Failed to add task. Please try again.")
    }
  }

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData)
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)))
      navigate("/dashboard/tasks")
    } catch (error) {
      console.error("Error updating task:", error)
      alert("Failed to update task. Please try again.")
    }
  }

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, {
        completed: !currentStatus,
      })
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)))
    } catch (error) {
      console.error("Error updating task status:", error)
      alert("Failed to update task status. Please try again.")
    }
  }

  const renderTasksList = () => {
    if (loading) {
      return <div className="loading">Loading tasks...</div>
    }

    if (error) {
      return <div className="error-message">{error}</div>
    }

    return (
      <>
        <div className="section-header">
          <h2>Tasks</h2>
          <button className="btn" onClick={() => navigate("/dashboard/tasks/add")}>
            Add New Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="no-tasks-message">
            <p>You haven't added any tasks yet. Start by adding your first task!</p>
            <button className="btn" onClick={() => navigate("/dashboard/tasks/add")}>
              Add Your First Task
            </button>
          </div>
        ) : (
          <div className="tasks-table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id || task.id} className={task.completed ? "completed-task" : ""}>
                    <td>{task.title}</td>
                    <td>{task.dueDate}</td>
                    <td>
                      <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                    </td>
                    <td>
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleComplete(task._id || task.id, task.completed)}
                        />
                        <span className="checkmark"></span>
                        {task.completed ? "Completed" : "Pending"}
                      </label>
                    </td>
                    <td>{task.notes}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn edit"
                          onClick={() => navigate(`/dashboard/tasks/edit/${task._id || task.id}`)}
                        >
                          Edit
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(task._id || task.id)}>
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
    <div className="dashboard-tasks">
      <Routes>
        <Route path="/" element={renderTasksList()} />
        <Route path="/add" element={<UserTaskForm onSubmit={handleAddTask} />} />
        <Route path="/edit/:id" element={<UserTaskForm tasks={tasks} onSubmit={handleUpdateTask} isEditing />} />
      </Routes>
    </div>
  )
}

export default UserTasks
