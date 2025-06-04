import Hero from "../components/Hero"
import FeatureCard from "../components/FeatureCard"
import CropCard from "../components/CropCard"
import NewsCard from "../components/NewsCard"
import "./Home.css"

const Home = () => {
  // Sample data for features
  const features = [
    {
      icon: "🌱",
      title: "Crop Management",
      description:
        "Get expert advice on crop selection, planting techniques, irrigation methods, and harvesting strategies.",
    },
    {
      icon: "📊",
      title: "Market Insights",
      description: "Stay updated with real-time market trends, crop prices, and demand forecasts to maximize profits.",
    },
    {
      icon: "🔔",
      title: "News & Updates",
      description: "Access the latest agricultural news, events, and policy updates that impact your farming business.",
    },
    {
      icon: "👨‍🌾",
      title: "Farmer Community",
      description: "Connect with fellow farmers, share experiences, and learn from successful agricultural practices.",
    },
  ]

  // Sample data for featured crops
  const featuredCrops = [
    {
      image: "/public/img/wheat.webp",
      name: "Wheat",
      season: "Winter",
      duration: "4-5 months",
      description: "A staple grain crop with high nutritional value and versatile uses in food production.",
    },
    {
      image: "/public/img/rice.webp",
      name: "Rice",
      season: "Monsoon",
      duration: "3-4 months",
      description: "One of the most consumed food crops worldwide, thriving in wet and humid conditions.",
    },
    {
      image: "/public/img/corn.avif",
      name: "Corn",
      season: "Spring-Summer",
      duration: "3-5 months",
      description: "A versatile crop used for food, feed, and biofuel with high yield potential.",
    },
  ]

  // Sample data for latest news
  const latestNews = [
    {
      image: "/public/img/crop.avif",
      title: "New Drought-Resistant Crop Varieties Released",
      date: "June 15, 2023",
      summary:
        "Scientists have developed new crop varieties that can withstand prolonged drought conditions, offering hope for farmers in arid regions.",
    },
    {
      image: "/public/img/organic.avif",
      title: "Government Announces Subsidy for Organic Farming",
      date: "June 10, 2023",
      summary:
        "The agriculture ministry has announced a new subsidy program to encourage farmers to transition to organic farming methods.",
    },
    {
      image: "/public/img/tech.avif",
      title: "Agricultural Tech Conference Coming Next Month",
      date: "June 5, 2023",
      summary:
        "The annual AgriTech Conference will showcase the latest innovations in farming technology and sustainable practices.",
    },
  ]

  return (
    <div className="home-page">
      <Hero />

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Why Choose FarmConnect</h2>
          <p className="section-subtitle">Comprehensive tools and resources for modern farming</p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Crops Section */}
      <section className="section crops-section">
        <div className="container">
          <h2 className="section-title">Featured Crops</h2>
          <p className="section-subtitle">Explore our detailed guides for popular crops</p>

          <div className="crops-grid">
            {featuredCrops.map((crop, index) => (
              <CropCard
                key={index}
                image={crop.image}
                name={crop.name}
                season={crop.season}
                duration={crop.duration}
                description={crop.description}
              />
            ))}
          </div>

          <div className="view-all-container">
            <a href="/crop-management" className="view-all-link">
              View All Crops
            </a>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section news-section">
        <div className="container">
          <h2 className="section-title">Latest Agricultural News</h2>
          <p className="section-subtitle">Stay informed with the latest developments in agriculture</p>

          <div className="news-grid">
            {latestNews.map((news, index) => (
              <NewsCard key={index} image={news.image} title={news.title} date={news.date} summary={news.summary} />
            ))}
          </div>

          <div className="view-all-container">
            <a href="/news-events" className="view-all-link">
              View All News
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Farming?</h2>
            <p className="cta-description">
              Join thousands of farmers who are already using FarmConnect to improve their yields and increase
              profitability.
            </p>
            <a href="/register" className="btn cta-button">
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
