import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">FarmConnect</h3>
          <p className="footer-description">
            Empowering farmers with technology and information for sustainable agriculture.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/crop-management">Crop Management</Link>
            </li>
            <li>
              <Link to="/market-trends">Market Trends</Link>
            </li>
            <li>
              <Link to="/news-events">News & Events</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Farming Guides</a>
            </li>
            <li>
              <a href="#">Weather Forecast</a>
            </li>
            <li>
              <a href="#">Government Schemes</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              123 Farm Road, Agriculture Valley
            </li>
            <li>
              <i className="fas fa-phone"></i>
              +1 (555) 123-4567
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              info@farmconnect.com
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} FarmConnect. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
