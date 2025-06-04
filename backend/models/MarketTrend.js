const mongoose = require("mongoose")

const MarketTrendSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  previousPrice: { type: Number, required: true },
  change: { type: Number, required: true },
  trend: { type: String, enum: ["up", "down", "stable"], required: true },
  timeframe: { type: String, enum: ["weekly", "monthly", "quarterly"], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Update the updatedAt field before saving
MarketTrendSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

const MarketTrend = mongoose.model("MarketTrend", MarketTrendSchema)
module.exports = MarketTrend
