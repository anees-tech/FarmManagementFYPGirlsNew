"use client"

import { useState } from "react"
import "./IrrigationGuide.css"

const IrrigationGuide = () => {
  const [activeMethod, setActiveMethod] = useState("drip")

  const irrigationMethods = [
    {
      id: "drip",
      name: "Drip Irrigation",
      icon: "fas fa-tint",
      description:
        "A highly efficient irrigation method that delivers water directly to the plant's root zone through a network of valves, pipes, tubing, and emitters.",
      benefits: [
        "Water efficiency (up to 90% compared to conventional methods)",
        "Reduced weed growth by minimizing water in non-target areas",
        "Decreased labor costs for water management",
        "Minimized soil erosion and nutrient leaching",
        "Ability to apply fertilizers directly through the system (fertigation)",
      ],
      bestFor: [
        "Row crops",
        "Orchards and vineyards",
        "Vegetable gardens",
        "Areas with water scarcity",
        "Sloped terrain",
      ],
      limitations: [
        "Higher initial installation cost",
        "Requires filtration to prevent clogging",
        "May need regular maintenance",
        "Not ideal for closely spaced crops that require full soil wetting",
      ],
      setupTips: [
        "Install a good filtration system to prevent emitter clogging",
        "Use pressure regulators to maintain optimal water flow",
        "Consider automated timers for consistent watering",
        "Space emitters according to soil type and plant needs",
        "Regularly inspect for leaks and clogs",
      ],
    },
    {
      id: "sprinkler",
      name: "Sprinkler Irrigation",
      icon: "fas fa-shower",
      description:
        "A method that simulates rainfall by spraying water through the air in controlled amounts and distributing it across the field.",
      benefits: [
        "Suitable for a wide range of crops and soil types",
        "Can be used for frost protection in some crops",
        "Relatively easy to install and operate",
        "Good for germinating seeds and establishing young plants",
        "Can cover large areas efficiently",
      ],
      bestFor: [
        "Field crops like corn, wheat, and soybeans",
        "Lawns and turf",
        "Medium to large farms",
        "Areas with moderate wind conditions",
        "Crops that benefit from overhead watering",
      ],
      limitations: [
        "Water loss through evaporation and wind drift",
        "May promote leaf diseases in some crops",
        "Less efficient than drip irrigation",
        "Not ideal for windy conditions",
        "Can cause soil compaction with heavy droplets",
      ],
      setupTips: [
        "Choose appropriate sprinkler heads for your crop and field size",
        "Water during early morning or evening to reduce evaporation",
        "Consider wind patterns when designing the system",
        "Ensure proper overlap between sprinklers for even coverage",
        "Monitor pressure to maintain consistent water distribution",
      ],
    },
    {
      id: "flood",
      name: "Flood Irrigation",
      icon: "fas fa-water",
      description:
        "A traditional method where water is applied to the soil surface and allowed to flow by gravity across the field, often through furrows or basins.",
      benefits: [
        "Low initial investment and equipment costs",
        "Simple technology with minimal technical expertise required",
        "No energy costs if gravity-fed",
        "Less filtration required compared to pressurized systems",
        "Effective for leaching salts from soil",
      ],
      bestFor: [
        "Rice cultivation",
        "Alfalfa and other forage crops",
        "Areas with abundant water supply",
        "Flat terrain",
        "Heavy soils that allow slow water penetration",
      ],
      limitations: [
        "High water usage and lower efficiency (40-60%)",
        "Requires level fields for uniform distribution",
        "Can cause soil erosion and nutrient runoff",
        "Labor intensive for setup and monitoring",
        "Not suitable for all soil types",
      ],
      setupTips: [
        "Level fields properly before implementing flood irrigation",
        "Create appropriate furrows or basins based on crop and soil type",
        "Monitor water flow to prevent excessive runoff",
        "Consider installing tailwater recovery systems",
        "Adjust irrigation timing based on soil moisture levels",
      ],
    },
    {
      id: "subsurface",
      name: "Subsurface Irrigation",
      icon: "fas fa-angle-double-down",
      description:
        "A specialized method where water is applied directly to the root zone beneath the soil surface through buried drip tapes or tubes.",
      benefits: [
        "Highest water use efficiency (up to 95%)",
        "Virtually no evaporation loss",
        "Reduced weed germination on soil surface",
        "Minimized disease pressure on foliage",
        "Less interference with field operations",
      ],
      bestFor: [
        "High-value crops",
        "Permanent crops like orchards and vineyards",
        "Areas with severe water restrictions",
        "Fields with regular tillage operations",
        "Locations where vandalism or damage to surface systems is a concern",
      ],
      limitations: [
        "Highest initial installation cost",
        "Difficult to inspect for problems",
        "Requires very clean water and good filtration",
        "Potential for root intrusion into emitters",
        "Challenging to repair if damaged",
      ],
      setupTips: [
        "Install at appropriate depth based on crop root zone",
        "Use high-quality materials designed for subsurface use",
        "Implement chemical injection to prevent root intrusion",
        "Include flush valves at the end of lines",
        "Consider future field operations when planning installation depth",
      ],
    },
  ]

  const selectedMethod = irrigationMethods.find((method) => method.id === activeMethod)

  const efficiencyData = [
    { label: "Drip", percentage: 90 },
    { label: "Subsurface", percentage: 95 },
    { label: "Sprinkler", percentage: 75 },
    { label: "Flood", percentage: 50 },
  ]

  const irrigationFactors = [
    {
      title: "Terrain",
      icon: "fas fa-mountain",
      description:
        "Consider the slope, uniformity, and topography of your land. Steep or uneven terrain may require specific irrigation methods.",
    },
    {
      title: "Crop Type",
      icon: "fas fa-leaf",
      description: "Different crops have varying water requirements, root depths, and sensitivity to water on foliage.",
    },
    {
      title: "Water Availability",
      icon: "fas fa-tint-slash",
      description:
        "The quantity, quality, and reliability of your water source will influence which irrigation method is most suitable.",
    },
    {
      title: "Budget",
      icon: "fas fa-dollar-sign",
      description:
        "Consider both initial installation costs and long-term operational expenses when selecting an irrigation system.",
    },
    {
      title: "Climate",
      icon: "fas fa-thermometer-half",
      description:
        "Temperature, rainfall patterns, wind conditions, and evaporation rates affect irrigation efficiency.",
    },
    {
      title: "Soil Type",
      icon: "fas fa-seedling",
      description: "Soil texture, structure, and infiltration rate determine how water moves through the soil profile.",
    },
  ]

  return (
    <div className="irrigation-guide-page">
      <div className="irrigation-guide-header">
        <div className="container">
          <h1 className="irrigation-guide-title">Irrigation Methods Guide</h1>
          <p className="irrigation-guide-subtitle">
            Learn about different irrigation techniques to maximize water efficiency and crop yields
          </p>
        </div>
      </div>

      <div className="container">
        <div className="irrigation-methods-nav">
          {irrigationMethods.map((method) => (
            <button
              key={method.id}
              className={`method-nav-button ${activeMethod === method.id ? "active" : ""}`}
              onClick={() => setActiveMethod(method.id)}
            >
              <i className={method.icon}></i>
              <span>{method.name}</span>
            </button>
          ))}
        </div>

        <div className="irrigation-method-content">
          <div className="method-header">
            <h2>{selectedMethod.name}</h2>
            <div className="method-icon">
              <i className={selectedMethod.icon}></i>
            </div>
          </div>

          <div className="method-description">
            <p>{selectedMethod.description}</p>
          </div>

          <div className="method-details-grid">
            {["benefits", "bestFor", "limitations", "setupTips"].map((key) => (
              <div key={key} className={`method-detail-card ${key}`}>
                <h3>{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</h3>
                <ul>
                  {selectedMethod[key].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="irrigation-efficiency-section">
          <h2>Water Efficiency Comparison</h2>
          <div className="efficiency-chart">
            {efficiencyData.map(({ label, percentage }) => (
              <div key={label} className="chart-bar">
                <div className="bar-label">{label}</div>
                <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${percentage}%` }}>
                    {percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="chart-note">
            *Efficiency percentages are approximate and can vary based on system design, maintenance, and environmental
            conditions.
          </p>
        </div>
      </div>

      <div className="irrigation-factors-section">
        <div className="container">
          <h2>Factors to Consider When Choosing an Irrigation Method</h2>
          <div className="factors-grid">
            {irrigationFactors.map((factor) => (
              <div key={factor.title} className="factor-card">
                <div className="factor-icon">
                  <i className={factor.icon}></i>
                </div>
                <h3>{factor.title}</h3>
                <p>{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IrrigationGuide
