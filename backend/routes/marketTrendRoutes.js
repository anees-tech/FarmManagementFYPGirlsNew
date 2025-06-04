const express = require("express")
const router = express.Router()
const MarketTrend = require("../models/MarketTrend")
const { auth, admin } = require("../middleware/auth")

// Get market trends by timeframe
router.get("/", async (req, res) => {
  try {
    const { timeframe = "weekly" } = req.query

    if (!["weekly", "monthly", "quarterly"].includes(timeframe)) {
      return res.status(400).json({ message: "Invalid timeframe" })
    }

    const trends = await MarketTrend.find({ timeframe })
    res.json(trends)
  } catch (err) {
    console.error("Error fetching market trends:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get a specific market trend by ID
router.get("/:id", async (req, res) => {
  try {
    const trend = await MarketTrend.findById(req.params.id)
    if (!trend) {
      return res.status(404).json({ message: "Market trend not found" })
    }
    res.json(trend)
  } catch (err) {
    console.error("Error fetching market trend:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Create a new market trend (admin only)
router.post("/", async (req, res) => {
  try {
    const newTrend = new MarketTrend(req.body)
    await newTrend.save()
    res.status(201).json(newTrend)
  } catch (err) {
    console.error("Error creating market trend:", err)
    res.status(500).json({ message: "Server Error: " + err.message })
  }
})

// Update a market trend (admin only)
router.put("/:id", async (req, res) => {
  try {
    const trend = await MarketTrend.findById(req.params.id)
    if (!trend) {
      return res.status(404).json({ message: "Market trend not found" })
    }

    // Update trend fields
    Object.keys(req.body).forEach((key) => {
      trend[key] = req.body[key]
    })

    await trend.save()
    res.json(trend)
  } catch (err) {
    console.error("Error updating market trend:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Delete a market trend (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const trend = await MarketTrend.findById(req.params.id)
    if (!trend) {
      return res.status(404).json({ message: "Market trend not found" })
    }

    await MarketTrend.deleteOne({ _id: req.params.id })
    res.json({ message: "Market trend deleted successfully" })
  } catch (err) {
    console.error("Error deleting market trend:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
