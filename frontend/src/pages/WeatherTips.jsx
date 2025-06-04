import React from 'react'
import './WeatherTips.css'

const WeatherTips = () => {
  const weatherConditions = [
    {
      id: 1,
      condition: 'Sunny & Hot',
      temperature: '32°C',
      humidity: '45%',
      icon: '☀️',
      tips: [
        'Increase irrigation frequency, especially for shallow-rooted crops',
        'Apply mulch around plants to retain soil moisture',
        'Schedule field work for early morning or evening hours',
        'Monitor crops for heat stress symptoms',
        'Ensure adequate shade for livestock'
      ],
      crops: ['Tomatoes', 'Peppers', 'Cotton', 'Sunflowers']
    },
    {
      id: 2,
      condition: 'Rainy & Overcast',
      temperature: '24°C',
      humidity: '85%',
      icon: '🌧️',
      tips: [
        'Delay harvesting until fields dry to prevent soil compaction',
        'Check drainage systems to prevent waterlogging',
        'Monitor crops for fungal diseases due to high humidity',
        'Apply fungicides preventively if needed',
        'Avoid heavy machinery use on wet soil'
      ],
      crops: ['Rice', 'Wheat', 'Barley', 'Corn']
    },
    {
      id: 3,
      condition: 'Windy & Dry',
      temperature: '28°C',
      humidity: '35%',
      icon: '💨',
      tips: [
        'Install windbreaks to protect young plants',
        'Increase watering frequency due to faster evaporation',
        'Secure greenhouse structures and equipment',
        'Monitor soil erosion in exposed areas',
        'Delay spraying operations to prevent drift'
      ],
      crops: ['Wheat', 'Barley', 'Sorghum', 'Millet']
    },
    {
      id: 4,
      condition: 'Cool & Humid',
      temperature: '18°C',
      humidity: '70%',
      icon: '🌫️',
      tips: [
        'Perfect conditions for cool-season crops',
        'Watch for slug and snail activity',
        'Reduce irrigation frequency',
        'Good time for transplanting seedlings',
        'Monitor for bacterial diseases in humid conditions'
      ],
      crops: ['Lettuce', 'Spinach', 'Broccoli', 'Peas']
    }
  ]

  const weeklyForecast = [
    { day: 'Monday', temp: '26°C', condition: 'Partly Cloudy', icon: '⛅', humidity: '60%' },
    { day: 'Tuesday', temp: '29°C', condition: 'Sunny', icon: '☀️', humidity: '45%' },
    { day: 'Wednesday', temp: '23°C', condition: 'Rainy', icon: '🌧️', humidity: '80%' },
    { day: 'Thursday', temp: '25°C', condition: 'Cloudy', icon: '☁️', humidity: '65%' },
    { day: 'Friday', temp: '31°C', condition: 'Hot & Sunny', icon: '🌞', humidity: '40%' },
    { day: 'Saturday', temp: '27°C', condition: 'Windy', icon: '💨', humidity: '55%' },
    { day: 'Sunday', temp: '22°C', condition: 'Cool & Misty', icon: '🌫️', humidity: '75%' }
  ]

  const seasonalTips = [
    {
      season: 'Spring',
      icon: '🌱',
      tips: [
        'Prepare soil for planting season',
        'Start seedlings indoors for warm-season crops',
        'Apply pre-emergent herbicides',
        'Check and repair irrigation systems'
      ]
    },
    {
      season: 'Summer',
      icon: '🌞',
      tips: [
        'Monitor water usage and irrigation schedules',
        'Watch for pest activity increase',
        'Harvest early summer crops',
        'Provide shade for sensitive plants'
      ]
    },
    {
      season: 'Fall',
      icon: '🍂',
      tips: [
        'Harvest main season crops',
        'Plant cover crops for soil protection',
        'Prepare equipment for winter storage',
        'Apply fall fertilizers'
      ]
    },
    {
      season: 'Winter',
      icon: '❄️',
      tips: [
        'Protect plants from frost damage',
        'Plan next year\'s crop rotation',
        'Maintain and service farm equipment',
        'Monitor stored grain conditions'
      ]
    }
  ]

  return (
    <div className="weather-tips">
      <div className="container">
        <header className="page-header">
          <h1>Weather Tips & Farming Guidance</h1>
          <p>Stay informed with weather conditions and get expert farming advice</p>
        </header>

        {/* Current Weather Conditions */}
        <section className="current-conditions">
          <h2>Current Weather Conditions & Tips</h2>
          <div className="conditions-grid">
            {weatherConditions.map(condition => (
              <div key={condition.id} className="condition-card">
                <div className="condition-header">
                  <div className="weather-icon">{condition.icon}</div>
                  <div className="weather-info">
                    <h3>{condition.condition}</h3>
                    <div className="weather-stats">
                      <span className="temperature">{condition.temperature}</span>
                      <span className="humidity">Humidity: {condition.humidity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="farming-tips">
                  <h4>Farming Tips:</h4>
                  <ul>
                    {condition.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="suitable-crops">
                  <h4>Suitable Crops:</h4>
                  <div className="crop-tags">
                    {condition.crops.map((crop, index) => (
                      <span key={index} className="crop-tag">{crop}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Forecast */}
        <section className="weekly-forecast">
          <h2>7-Day Weather Forecast</h2>
          <div className="forecast-grid">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="day-name">{day.day}</div>
                <div className="day-icon">{day.icon}</div>
                <div className="day-temp">{day.temp}</div>
                <div className="day-condition">{day.condition}</div>
                <div className="day-humidity">{day.humidity}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Tips */}
        <section className="seasonal-tips">
          <h2>Seasonal Farming Tips</h2>
          <div className="seasons-grid">
            {seasonalTips.map((season, index) => (
              <div key={index} className="season-card">
                <div className="season-header">
                  <span className="season-icon">{season.icon}</span>
                  <h3>{season.season}</h3>
                </div>
                <ul className="season-tips">
                  {season.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Weather Alerts */}
        <section className="weather-alerts">
          <h2>Weather Alerts & Warnings</h2>
          <div className="alerts-container">
            <div className="alert warning">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <h4>High Temperature Warning</h4>
                <p>Temperatures expected to reach 35°C+ this week. Increase irrigation and monitor livestock closely.</p>
              </div>
            </div>
            <div className="alert info">
              <div className="alert-icon">💧</div>
              <div className="alert-content">
                <h4>Rainfall Expected</h4>
                <p>Heavy rainfall predicted for Wednesday-Thursday. Plan indoor activities and check drainage systems.</p>
              </div>
            </div>
            <div className="alert success">
              <div className="alert-icon">🌱</div>
              <div className="alert-content">
                <h4>Optimal Growing Conditions</h4>
                <p>Perfect weather conditions for planting cool-season crops this weekend.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default WeatherTips