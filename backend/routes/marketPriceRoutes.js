const express = require('express');
const router = express.Router();
const MarketPrice = require('../models/MarketPrice');

// Get all market prices
router.get('/', async (req, res) => {
  try {
    const { category, location, market, isActive } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (location) filter.location = new RegExp(location, 'i');
    if (market) filter.market = new RegExp(market, 'i');
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    const marketPrices = await MarketPrice.find(filter).sort({ lastUpdated: -1 });
    res.json(marketPrices);
  } catch (err) {
    console.error('Error fetching market prices:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get market price by ID
router.get('/:id', async (req, res) => {
  try {
    const marketPrice = await MarketPrice.findById(req.params.id);
    if (!marketPrice) {
      return res.status(404).json({ message: 'Market price not found' });
    }
    res.json(marketPrice);
  } catch (err) {
    console.error('Error fetching market price:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new market price (admin only)
router.post('/', async (req, res) => {
  try {
    console.log('Received market price data:', req.body);
    
    // Ensure required fields are present
    const {
      cropName,
      category,
      currentPrice,
      previousPrice,
      unit = 'per kg',
      market,
      location,
      quality = 'Standard',
      isActive = true,
      notes = ''
    } = req.body;

    // Validate required fields
    if (!cropName || !category || !currentPrice || !previousPrice || !market || !location) {
      return res.status(400).json({ 
        message: 'Missing required fields: cropName, category, currentPrice, previousPrice, market, location' 
      });
    }

    const marketPriceData = {
      cropName: cropName.trim(),
      category,
      currentPrice: parseFloat(currentPrice),
      previousPrice: parseFloat(previousPrice),
      unit,
      market: market.trim(),
      location: location.trim(),
      quality,
      isActive,
      notes: notes ? notes.trim() : ''
    };

    console.log('Creating market price with data:', marketPriceData);

    const newMarketPrice = new MarketPrice(marketPriceData);
    const savedMarketPrice = await newMarketPrice.save();
    
    console.log('Market price created successfully:', savedMarketPrice);
    res.status(201).json(savedMarketPrice);
  } catch (err) {
    console.error('Error creating market price:', err);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

// Update a market price (admin only)
router.put('/:id', async (req, res) => {
  try {
    const marketPrice = await MarketPrice.findById(req.params.id);
    if (!marketPrice) {
      return res.status(404).json({ message: 'Market price not found' });
    }

    console.log('Updating market price with data:', req.body);

    // Update fields
    const updateFields = {};
    const allowedFields = [
      'cropName', 'category', 'currentPrice', 'previousPrice', 
      'unit', 'market', 'location', 'quality', 'isActive', 'notes'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'currentPrice' || field === 'previousPrice') {
          updateFields[field] = parseFloat(req.body[field]);
        } else if (field === 'cropName' || field === 'market' || field === 'location' || field === 'notes') {
          updateFields[field] = req.body[field].toString().trim();
        } else {
          updateFields[field] = req.body[field];
        }
      }
    });

    // Update the document
    Object.assign(marketPrice, updateFields);
    marketPrice.lastUpdated = new Date();

    const updatedMarketPrice = await marketPrice.save();
    console.log('Market price updated successfully:', updatedMarketPrice);
    
    res.json(updatedMarketPrice);
  } catch (err) {
    console.error('Error updating market price:', err);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

// Delete a market price (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const marketPrice = await MarketPrice.findById(req.params.id);
    if (!marketPrice) {
      return res.status(404).json({ message: 'Market price not found' });
    }

    await MarketPrice.deleteOne({ _id: req.params.id });
    console.log('Market price deleted successfully:', req.params.id);
    res.json({ message: 'Market price deleted successfully' });
  } catch (err) {
    console.error('Error deleting market price:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get market summary/statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalPrices = await MarketPrice.countDocuments({ isActive: true });
    const categories = await MarketPrice.distinct('category');
    const locations = await MarketPrice.distinct('location');
    const markets = await MarketPrice.distinct('market');
    
    const trendStats = await MarketPrice.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$trend', count: { $sum: 1 } } }
    ]);

    res.json({
      totalPrices,
      totalCategories: categories.length,
      totalLocations: locations.length,
      totalMarkets: markets.length,
      trendStats,
      categories,
      locations,
      markets
    });
  } catch (err) {
    console.error('Error fetching market stats:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;