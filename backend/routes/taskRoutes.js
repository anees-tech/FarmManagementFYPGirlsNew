const express = require("express")
const router = express.Router()
const Task = require("../models/Task")
const { auth } = require("../middleware/auth")

// Get all tasks (admin only)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    console.error("Error fetching all tasks:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get tasks for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" })
    }

    console.log("Fetching tasks for user:", userId)

    const tasks = await Task.find({ user: userId })
    console.log("Found tasks:", tasks.length)

    res.json(tasks)
  } catch (err) {
    console.error("Error fetching user tasks:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get a specific task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json(task)
  } catch (err) {
    console.error("Error fetching task:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Create a new task
router.post("/", async (req, res) => {
  try {
    // Ensure user ID is included in the request
    if (!req.body.user) {
      return res.status(400).json({ message: "User ID is required" })
    }

    console.log("Creating new task:", req.body)

    const newTask = new Task(req.body)
    await newTask.save()

    console.log("Created task:", newTask)
    res.status(201).json(newTask)
  } catch (err) {
    console.error("Error creating task:", err)
    res.status(500).json({ message: "Server Error: " + err.message })
  }
})

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Update task fields
    Object.keys(req.body).forEach((key) => {
      // Don't allow updating the user field
      if (key !== "user") {
        task[key] = req.body[key]
      }
    })

    await task.save()
    res.json(task)
  } catch (err) {
    console.error("Error updating task:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    await Task.deleteOne({ _id: req.params.id })
    res.json({ message: "Task deleted successfully" })
  } catch (err) {
    console.error("Error deleting task:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
