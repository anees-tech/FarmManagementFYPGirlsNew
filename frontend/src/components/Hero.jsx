import { Link } from "react-router-dom"
import "./Hero.css"

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Grow Better, Harvest Smarter</h1>
        <p className="hero-subtitle">
          Your complete resource for modern farming techniques, market insights, and agricultural innovation.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary hero-btn">
            Get Started
          </Link>
          <Link to="/crop-management" className="btn btn-secondary hero-btn">
            Explore Resources
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
