const express = require("express")
const router = express.Router()
const Crop = require("../models/Crop")
const { auth, admin } = require("../middleware/auth")

// Get all crops
router.get("/", async (req, res) => {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("Fetching all crops");
    }
    const crops = await Crop.find()
    console.log(`Found ${crops.length} crops`)
    res.json(crops)
  } catch (err) {
    console.error("Error fetching crops:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get crop statistics (admin only) - MOVE THIS BEFORE /:idOrSlug
router.get("/stats", async (req, res) => {
  try {
    const totalCrops = await Crop.countDocuments();
    
    // Get crop count by category
    const cropsByCategory = await Crop.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    // Get crops by season
    const cropsBySeason = await Crop.aggregate([
      {
        $group: {
          _id: "$season",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalCrops,
      cropsByCategory,
      cropsBySeason
    });
  } catch (err) {
    console.error("Error fetching crop stats:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a specific crop by ID or slug - KEEP THIS AFTER /stats
router.get("/:idOrSlug", async (req, res) => {
  try {
    let crop
    const idOrSlug = req.params.idOrSlug
    console.log(`Fetching crop with ID or slug: ${idOrSlug}`)

    // Check if the parameter is an ObjectId
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      crop = await Crop.findById(idOrSlug)
    } else {
      // Otherwise, treat it as a slug
      crop = await Crop.findOne({ slug: idOrSlug })
    }

    if (!crop) {
      console.log(`Crop not found with ID or slug: ${idOrSlug}`)
      return res.status(404).json({ message: "Crop not found" })
    }

    console.log(`Found crop: ${crop.name}`)
    res.json(crop)
  } catch (err) {
    console.error("Error fetching crop:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Create a new crop (admin only)
router.post("/", async (req, res) => {
  try {
    const newCrop = new Crop(req.body)
    await newCrop.save()
    res.status(201).json(newCrop)
  } catch (err) {
    console.error("Error creating crop:", err)
    res.status(500).json({ message: "Server Error: " + err.message })
  }
})

// Update a crop (admin only)
router.put("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id)
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" })
    }

    // Update crop fields
    Object.keys(req.body).forEach((key) => {
      crop[key] = req.body[key]
    })

    await crop.save()
    res.json(crop)
  } catch (err) {
    console.error("Error updating crop:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Delete a crop (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id)
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" })
    }

    await Crop.deleteOne({ _id: req.params.id })
    res.json({ message: "Crop deleted successfully" })
  } catch (err) {
    console.error("Error deleting crop:", err)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
