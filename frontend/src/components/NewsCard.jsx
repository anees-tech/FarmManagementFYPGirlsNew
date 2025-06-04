import "./NewsCard.css"

const NewsCard = ({ image, title, date, summary }) => {
  return (
    <div className="news-card">
      <div className="news-image">
        <img src={image || "/placeholder.svg"} alt={title} />
        <div className="news-date">{date}</div>
      </div>
      <div className="news-content">
        <h3 className="news-title">{title}</h3>
        <p className="news-summary">{summary}</p>
        <a href="#" className="news-link">
          Read More
        </a>
      </div>
    </div>
  )
}

export default NewsCard
