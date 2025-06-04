"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const UserTaskForm = ({ tasks = [], onSubmit, isEditing = false }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    priority: "Medium",
    completed: false,
    description: "",
    notes: "",
  })

  useEffect(() => {
    // Wait until tasks are available
    if (!Array.isArray(tasks) || tasks.length === 0) return

    // If editing, populate form with existing data
    if (isEditing && id) {
      const taskToEdit = tasks.find(
        (task) => task && typeof task.id !== "undefined" && task.id.toString() === id
      )
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title || "",
          dueDate: taskToEdit.dueDate || "",
          priority: taskToEdit.priority || "Medium",
          completed: taskToEdit.completed || false,
          description: taskToEdit.description || "",
          notes: taskToEdit.notes || "",
        })
      }
    }
  }, [isEditing, id, tasks])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      onSubmit(id, formData)
    } else {
      onSubmit(formData)
    }
  }

  return (
    <div className="form-container">
      <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="completed">Status</label>
          <div className="checkbox-container form-checkbox">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            <span className="checkbox-label">Mark as completed</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Add any details about this task..."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="notes">notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Add any details about this task..."
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={() => navigate("/dashboard/tasks")} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn">
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserTaskForm
