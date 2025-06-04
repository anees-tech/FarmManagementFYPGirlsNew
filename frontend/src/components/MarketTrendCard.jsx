import "./MarketTrendCard.css"

const MarketTrendCard = ({ crop, currentPrice, previousPrice, change, trend }) => {
  const trendClass = trend === "up" ? "trend-up" : trend === "down" ? "trend-down" : "trend-stable"

  return (
    <div className="market-trend-card">
      <h3 className="crop-name">{crop}</h3>
      <div className="price-container">
        <div className="current-price">${currentPrice}/ton</div>
        <div className={`price-change ${trendClass}`}>
          {change > 0 ? "+" : ""}
          {change}%<span className="trend-arrow">{trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}</span>
        </div>
      </div>
      <div className="previous-price">Previous: ${previousPrice}/ton</div>
    </div>
  )
}

export default MarketTrendCard
