import { Link } from "react-router-dom"
import "./CropCard.css"

const CropCard = ({ id, slug, image, name, season, duration, description }) => {
  return (
    <div className="crop-card">
      <div className="crop-image">
        <img src={image || "/placeholder.svg"} alt={name} />
      </div>
      <div className="crop-content">
        <h3 className="crop-name">{name}</h3>
        <div className="crop-details">
          <span className="crop-season">Season: {season}</span>
          <span className="crop-duration">Duration: {duration}</span>
        </div>
        <p className="crop-description">{description}</p>
        <Link to={`/crop/${slug || id}`} className="btn crop-btn">
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default CropCard
