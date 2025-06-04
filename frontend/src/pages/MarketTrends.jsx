"use client"

import { useState } from "react"
import MarketTrendCard from "../components/MarketTrendCard"
import marketTrends from "../data/marketTrends"
import "./MarketTrends.css"

const MarketTrends = () => {
  const [timeframe, setTimeframe] = useState("weekly")

  return (
    <div className="market-trends-page">
      <div className="market-hero">
        <div className="container">
          <h1 className="market-hero-title">Market Trends</h1>
          <p className="market-hero-subtitle">
            Stay updated with the latest crop prices and market trends to make informed decisions for your farm.
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="timeframe-selector">
          <button
            className={`timeframe-btn ${timeframe === "weekly" ? "active" : ""}`}
            onClick={() => setTimeframe("weekly")}
          >
            Weekly
          </button>
          <button
            className={`timeframe-btn ${timeframe === "monthly" ? "active" : ""}`}
            onClick={() => setTimeframe("monthly")}
          >
            Monthly
          </button>
          <button
            className={`timeframe-btn ${timeframe === "quarterly" ? "active" : ""}`}
            onClick={() => setTimeframe("quarterly")}
          >
            Quarterly
          </button>
        </div>

        <div className="market-trends-grid">
          {marketTrends[timeframe].map((item) => (
            <MarketTrendCard
              key={item.id}
              crop={item.crop}
              currentPrice={item.currentPrice}
              previousPrice={item.previousPrice}
              change={item.change}
              trend={item.trend}
            />
          ))}
        </div>

        <div className="market-info-box">
          <h3>Market Analysis</h3>
          <p>
            The agricultural market is influenced by various factors including weather conditions, global demand,
            government policies, and seasonal variations. Understanding these trends can help farmers make strategic
            decisions about crop selection, timing of sales, and price negotiations.
          </p>
          <p>
            <strong>Note:</strong> The prices shown are average wholesale prices per ton. Actual prices may vary based
            on quality, location, and specific market conditions.
          </p>
        </div>
      </div>

      <div className="market-charts section">
        <div className="container">
          <h2 className="section-title">Price Trends Over Time</h2>

          <div className="chart-container">
            <div className="chart-placeholder">
              <p>Interactive price trend chart will be displayed here.</p>
              <p className="chart-note">This feature will be available in the next update.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="market-forecast section">
        <div className="container">
          <h2 className="section-title">Market Forecast</h2>

          <div className="forecast-content">
            <div className="forecast-text">
              <p>
                Based on current trends and historical data, our agricultural experts predict the following market
                movements for the upcoming season:
              </p>

              <ul className="forecast-list">
                <li>
                  <strong>Grains:</strong> Wheat prices are expected to remain strong due to increased global demand and
                  potential supply constraints in major producing regions.
                </li>
                <li>
                  <strong>Vegetables:</strong> Tomato and potato prices may experience volatility due to seasonal
                  factors and changing weather patterns.
                </li>
                <li>
                  <strong>Cash Crops:</strong> Cotton prices are projected to recover gradually as textile industry
                  demand increases post-pandemic.
                </li>
                <li>
                  <strong>Fruits:</strong> Apple prices are expected to remain stable with potential for growth as
                  export markets expand.
                </li>
              </ul>

              <p className="forecast-disclaimer">
                <strong>Disclaimer:</strong> These forecasts are based on current data and expert analysis but are
                subject to change based on unforeseen market conditions, weather events, or policy changes.
              </p>
            </div>

            <div className="forecast-image">
              <img src="/market-forecast.jpg" alt="Market Forecast" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketTrends
