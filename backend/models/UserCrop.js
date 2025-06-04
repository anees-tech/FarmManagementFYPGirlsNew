const mongoose = require("mongoose")

const UserCropSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  area: { type: String, required: true },
  plantingDate: { type: String, required: true },
  harvestDate: { type: String, required: true },
  season: { type: String, required: true },
  waterLevel:{ type: String, required: true }, //change 3 backend
  status: { type: String, enum: ["Planned", "Growing", "Harvested"], required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Update the updatedAt field before saving
UserCropSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

const UserCrop = mongoose.model("UserCrop", UserCropSchema)
module.exports = UserCrop
