const express = require("express")
const router = express.Router()
const UserCrop = require("../models/UserCrop")
const { auth } = require("../middleware/auth")

// Get all user crops (admin only)
router.get("/", async (req, res) => {
  try {
    const userCrops = await UserCrop.find()
    res.json(userCrops)
  } catch (err) {
    console.error("Error fetching all user crops:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get user crops for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" })
    }

    console.log("Fetching crops for user:", userId)

    const userCrops = await UserCrop.find({ user: userId })
    console.log("Found crops:", userCrops.length)

    res.json(userCrops)
  } catch (err) {
    console.error("Error fetching user crops:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get a specific user crop by ID
router.get("/:id", async (req, res) => {
  try {
    const crop = await UserCrop.findById(req.params.id)
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" })
    }
    res.json(crop)
  } catch (err) {
    console.error("Error fetching user crop:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Create a new user crop
router.post("/", async (req, res) => {
  try {
    // Ensure user ID is included in the request
    if (!req.body.user) {
      return res.status(400).json({ message: "User ID is required" })
    }

    console.log("Creating new user crop:", req.body)

    const newCrop = new UserCrop(req.body)
    await newCrop.save()

    console.log("Created crop:", newCrop)
    res.status(201).json(newCrop)
  } catch (err) {
    console.error("Error creating user crop:", err)
    res.status(500).json({ message: "Server Error: " + err.message })
  }
})

// Update a user crop
router.put("/:id", async (req, res) => {
  try {
    const crop = await UserCrop.findById(req.params.id)
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" })
    }

    // Update crop fields
    Object.keys(req.body).forEach((key) => {
      // Don't allow updating the user field
      if (key !== "user") {
        crop[key] = req.body[key]
      }
    })

    await crop.save()
    res.json(crop)
  } catch (err) {
    console.error("Error updating user crop:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Delete a user crop
router.delete("/:id", async (req, res) => {
  try {
    const crop = await UserCrop.findById(req.params.id)
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" })
    }

    await UserCrop.deleteOne({ _id: req.params.id })
    res.json({ message: "Crop deleted successfully" })
  } catch (err) {
    console.error("Error deleting user crop:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
