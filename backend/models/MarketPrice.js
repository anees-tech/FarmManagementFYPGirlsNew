const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['grain', 'vegetable', 'fruit', 'legume', 'fiber', 'cash', 'spices', 'oilseeds']
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  previousPrice: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    default: 'per kg',
    enum: ['per kg', 'per quintal', 'per ton', 'per dozen', 'per piece']
  },
  market: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  quality: {
    type: String,
    required: true,
    enum: ['Premium', 'Standard', 'Fair', 'Poor']
  },
  trend: {
    type: String,
    enum: ['up', 'down', 'stable'],
    default: 'stable'
  },
  changePercentage: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Calculate trend and change percentage before validation
marketPriceSchema.pre('validate', function(next) {
  if (this.currentPrice !== undefined && this.previousPrice !== undefined) {
    const current = parseFloat(this.currentPrice);
    const previous = parseFloat(this.previousPrice);
    
    if (previous > 0) {
      const change = current - previous;
      this.changePercentage = parseFloat(((change / previous) * 100).toFixed(2));
      
      if (change > 0) {
        this.trend = 'up';
      } else if (change < 0) {
        this.trend = 'down';
      } else {
        this.trend = 'stable';
      }
    } else {
      this.changePercentage = 0;
      this.trend = 'stable';
    }
  }
  next();
});

// Also update on save for existing documents
marketPriceSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model('MarketPrice', marketPriceSchema);