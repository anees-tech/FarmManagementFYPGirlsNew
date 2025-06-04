import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './MarketInfo.css';

const API_URL = 'http://localhost:5000/api';

const MarketInfo = () => {
  const [marketPrices, setMarketPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [marketStats, setMarketStats] = useState(null);
  const { isAdmin, getAuthHeaders } = useAuth();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'grain', label: 'Grains' },
    { value: 'vegetable', label: 'Vegetables' },
    { value: 'fruit', label: 'Fruits' },
    { value: 'legume', label: 'Legumes' },
    { value: 'fiber', label: 'Fiber Crops' },
    { value: 'cash', label: 'Cash Crops' },
    { value: 'spices', label: 'Spices' },
    { value: 'oilseeds', label: 'Oilseeds' }
  ];

  useEffect(() => {
    fetchMarketPrices();
    fetchMarketStats();
  }, []);

  useEffect(() => {
    filterPrices();
  }, [marketPrices, selectedCategory, selectedLocation, searchTerm]);

  const fetchMarketPrices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/market-prices?isActive=true`);
      setMarketPrices(response.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching market prices:', error);
      setError('Failed to load market prices. Please try again.');
      // Load dummy data for demo
      const dummyData = generateDummyMarketData();
      setMarketPrices(dummyData);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/market-prices/stats/summary`);
      setMarketStats(response.data);
    } catch (error) {
      console.error('Error fetching market stats:', error);
    }
  };

  const generateDummyMarketData = () => {
    return [
      {
        _id: '1',
        cropName: 'Wheat',
        category: 'grain',
        currentPrice: 2850,
        previousPrice: 2720,
        unit: 'per quintal',
        market: 'APMC Pune',
        location: 'Maharashtra',
        quality: 'Premium',
        trend: 'up',
        changePercentage: 4.78,
        lastUpdated: new Date().toISOString(),
        notes: 'Good demand due to export orders'
      },
      {
        _id: '2',
        cropName: 'Rice',
        category: 'grain',
        currentPrice: 3200,
        previousPrice: 3350,
        unit: 'per quintal',
        market: 'Nizamabad Market',
        location: 'Telangana',
        quality: 'Standard',
        trend: 'down',
        changePercentage: -4.48,
        lastUpdated: new Date().toISOString(),
        notes: 'Seasonal price drop'
      },
      {
        _id: '3',
        cropName: 'Tomato',
        category: 'vegetable',
        currentPrice: 45,
        previousPrice: 38,
        unit: 'per kg',
        market: 'Koyambedu Market',
        location: 'Tamil Nadu',
        quality: 'Premium',
        trend: 'up',
        changePercentage: 18.42,
        lastUpdated: new Date().toISOString(),
        notes: 'Supply shortage due to weather'
      },
      {
        _id: '4',
        cropName: 'Potato',
        category: 'vegetable',
        currentPrice: 25,
        previousPrice: 25,
        unit: 'per kg',
        market: 'Agra Mandi',
        location: 'Uttar Pradesh',
        quality: 'Standard',
        trend: 'stable',
        changePercentage: 0,
        lastUpdated: new Date().toISOString(),
        notes: 'Stable demand and supply'
      },
      {
        _id: '5',
        cropName: 'Cotton',
        category: 'cash',
        currentPrice: 6800,
        previousPrice: 6500,
        unit: 'per quintal',
        market: 'Guntur Market',
        location: 'Andhra Pradesh',
        quality: 'Premium',
        trend: 'up',
        changePercentage: 4.62,
        lastUpdated: new Date().toISOString(),
        notes: 'International demand increasing'
      },
      {
        _id: '6',
        cropName: 'Apple',
        category: 'fruit',
        currentPrice: 120,
        previousPrice: 135,
        unit: 'per kg',
        market: 'Shimla Market',
        location: 'Himachal Pradesh',
        quality: 'Premium',
        trend: 'down',
        changePercentage: -11.11,
        lastUpdated: new Date().toISOString(),
        notes: 'New harvest season'
      }
    ];
  };

  const filterPrices = () => {
    let filtered = marketPrices;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(price => price.category === selectedCategory);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(price => 
        price.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(price => 
        price.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.market.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPrices(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➡️';
    }
  };

  const getTrendClass = (trend) => {
    return `trend-${trend}`;
  };

  if (loading) {
    return (
      <div className="market-info-page">
        <div className="container">
          <div className="loading">Loading market information...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="market-info-page">
      <div className="container">
        <header className="page-header">
          <h1>Market Information</h1>
          <p>Daily crop prices and market trends across major agricultural markets</p>
          {isAdmin && (
            <button 
              className="btn admin-btn"
              onClick={() => window.location.href = '/admin/market-prices'}
            >
              Manage Market Prices
            </button>
          )}
        </header>

        {/* Market Stats */}
        {marketStats && (
          <section className="market-stats">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{marketStats.totalPrices || filteredPrices.length}</div>
                <div className="stat-label">Active Prices</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{marketStats.totalCategories || categories.length - 1}</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{marketStats.totalMarkets || 15}</div>
                <div className="stat-label">Markets</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{marketStats.totalLocations || 20}</div>
                <div className="stat-label">Locations</div>
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="market-filters">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="search">Search Crops/Markets:</label>
              <input
                id="search"
                type="text"
                placeholder="Search by crop name or market..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="location">Location:</label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Locations</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="telangana">Telangana</option>
                <option value="tamil nadu">Tamil Nadu</option>
                <option value="uttar pradesh">Uttar Pradesh</option>
                <option value="andhra pradesh">Andhra Pradesh</option>
                <option value="himachal pradesh">Himachal Pradesh</option>
                <option value="punjab">Punjab</option>
                <option value="haryana">Haryana</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="gujarat">Gujarat</option>
              </select>
            </div>

            <button 
              className="btn filter-clear-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLocation('all');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </section>

        {/* Market Prices Table */}
        <section className="market-prices">
          <h2>Current Market Prices</h2>
          
          {error && (
            <div className="error-message">
              {error}
              <br />
              <small>Showing demo data for preview</small>
            </div>
          )}

          {filteredPrices.length === 0 ? (
            <div className="no-data">
              <p>No market prices found matching your filters.</p>
            </div>
          ) : (
            <div className="market-table-container">
              <table className="market-table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Category</th>
                    <th>Current Price</th>
                    <th>Previous Price</th>
                    <th>Change</th>
                    <th>Trend</th>
                    <th>Market</th>
                    <th>Location</th>
                    <th>Quality</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrices.map((price) => (
                    <tr key={price._id || price.id}>
                      <td className="crop-name">{price.cropName}</td>
                      <td className="category">
                        <span className={`category-badge ${price.category}`}>
                          {price.category}
                        </span>
                      </td>
                      <td className="current-price">
                        {formatPrice(price.currentPrice)}
                        <small>/{price.unit}</small>
                      </td>
                      <td className="previous-price">
                        {formatPrice(price.previousPrice)}
                      </td>
                      <td className={`price-change ${getTrendClass(price.trend)}`}>
                        {price.changePercentage > 0 ? '+' : ''}{price.changePercentage}%
                      </td>
                      <td className="trend">
                        <span className={`trend-indicator ${getTrendClass(price.trend)}`}>
                          {getTrendIcon(price.trend)} {price.trend}
                        </span>
                      </td>
                      <td className="market">{price.market}</td>
                      <td className="location">{price.location}</td>
                      <td className="quality">
                        <span className={`quality-badge ${price.quality.toLowerCase()}`}>
                          {price.quality}
                        </span>
                      </td>
                      <td className="last-updated">
                        {formatDate(price.lastUpdated)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Market Trends Summary */}
        <section className="market-trends-summary">
          <h2>Market Trends Summary</h2>
          <div className="trends-grid">
            <div className="trend-card up">
              <div className="trend-icon">📈</div>
              <div className="trend-info">
                <h3>Rising Prices</h3>
                <p>{filteredPrices.filter(p => p.trend === 'up').length} crops showing upward trend</p>
              </div>
            </div>
            <div className="trend-card down">
              <div className="trend-icon">📉</div>
              <div className="trend-info">
                <h3>Falling Prices</h3>
                <p>{filteredPrices.filter(p => p.trend === 'down').length} crops showing downward trend</p>
              </div>
            </div>
            <div className="trend-card stable">
              <div className="trend-icon">➡️</div>
              <div className="trend-info">
                <h3>Stable Prices</h3>
                <p>{filteredPrices.filter(p => p.trend === 'stable').length} crops with stable prices</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section className="market-insights">
          <h2>Market Insights</h2>
          <div className="insights-content">
            <div className="insight-card">
              <h3>🌾 Grain Markets</h3>
              <p>Wheat prices continue to show strength due to strong export demand and limited supply. Rice markets are experiencing seasonal corrections.</p>
            </div>
            <div className="insight-card">
              <h3>🥕 Vegetable Markets</h3>
              <p>Tomato prices are volatile due to weather conditions. Potato markets remain stable with adequate supply from major producing regions.</p>
            </div>
            <div className="insight-card">
              <h3>🍎 Fruit Markets</h3>
              <p>Apple harvest season is bringing prices down in northern markets. Citrus fruits are expected to see price increases as winter approaches.</p>
            </div>
            <div className="insight-card">
              <h3>💰 Cash Crops</h3>
              <p>Cotton prices are supported by strong international demand. Sugarcane rates are stable with government support prices in effect.</p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="market-disclaimer">
          <div className="disclaimer-content">
            <h3>📋 Important Notice</h3>
            <p>
              <strong>Disclaimer:</strong> The market prices displayed are indicative and based on available market data. 
              Actual prices may vary based on quality, quantity, location, and specific market conditions. 
              Always verify current rates with local markets before making trading decisions.
            </p>
            <p>
              <strong>Data Sources:</strong> Prices are collected from various APMC markets, wholesale markets, 
              and commodity exchanges across India. Data is updated regularly during market hours.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketInfo;