const mongoose = require("mongoose")

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  // scientificName: { type: String, required: true },
  season: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  // fullDescription: { type: String, required: true },
  planting: { type: String, required: true },
  care: { type: String, required: true },
  farmerName: { type: String, required: true },
   harvesting: { type: String, required: true },
  // pests: { type: String, required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Create slug from name before saving
CropSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-")
  }
  this.updatedAt = Date.now()
  next()
})

const Crop = mongoose.model("Crop", CropSchema)
module.exports = Crop
