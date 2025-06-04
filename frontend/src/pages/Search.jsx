"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import "./Search.css"

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    if (!query) {
      setResults([])
      setLoading(false)
      return
    }

    // In a real app, you would fetch search results from an API
    // For now, we'll simulate a search with mock data
    const fetchSearchResults = () => {
      setLoading(true)

      // Simulate API delay
      setTimeout(() => {
        // Mock search results
        const mockResults = [
          {
            id: 1,
            type: "crop",
            title: "Wheat",
            description: "A staple grain crop with high nutritional value and versatile uses in food production.",
            url: "/crop/1",
            image: "/crops/wheat.jpg",
          },
          {
            id: 2,
            type: "crop",
            title: "Rice",
            description: "One of the most consumed food crops worldwide, thriving in wet and humid conditions.",
            url: "/crop/2",
            image: "/crops/rice.jpg",
          },
          {
            id: 3,
            type: "news",
            title: "New Drought-Resistant Crop Varieties Released",
            description:
              "Scientists have developed new crop varieties that can withstand prolonged drought conditions.",
            url: "/news/1",
            date: "June 15, 2023",
            image: "/news/news1.jpg",
          },
          {
            id: 4,
            type: "market",
            title: "Wheat Market Trends",
            description: "Current prices and future forecasts for wheat in the global market.",
            url: "/market-trends",
            image: "/market-wheat.jpg",
          },
          {
            id: 5,
            type: "faq",
            title: "How do I add a new crop to my farm?",
            description: "Learn how to add and manage crops in your FarmConnect dashboard.",
            url: "/support#crops",
          },
        ]

        // Filter results based on query
        const filteredResults = mockResults.filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()),
        )

        setResults(filteredResults)
        setLoading(false)
      }, 1000)
    }

    fetchSearchResults()
  }, [query])

  // Filter results by type
  const filteredResults = activeFilter === "all" ? results : results.filter((result) => result.type === activeFilter)

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <h1 className="search-title">Search Results</h1>
          <div className="search-query">
            {query ? (
              <p>
                Showing results for: <span className="search-term">"{query}"</span>
              </p>
            ) : (
              <p>Please enter a search term</p>
            )}
          </div>
        </div>
      </div>

      <div className="container section">
        {query && (
          <div className="search-filters">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Results ({results.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "crop" ? "active" : ""}`}
              onClick={() => setActiveFilter("crop")}
            >
              Crops ({results.filter((r) => r.type === "crop").length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "news" ? "active" : ""}`}
              onClick={() => setActiveFilter("news")}
            >
              News ({results.filter((r) => r.type === "news").length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "market" ? "active" : ""}`}
              onClick={() => setActiveFilter("market")}
            >
              Market ({results.filter((r) => r.type === "market").length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "faq" ? "active" : ""}`}
              onClick={() => setActiveFilter("faq")}
            >
              FAQ ({results.filter((r) => r.type === "faq").length})
            </button>
          </div>
        )}

        <div className="search-results">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Searching...</p>
            </div>
          ) : !query ? (
            <div className="no-query">
              <div className="no-query-icon">
                <i className="fas fa-search"></i>
              </div>
              <h2>Enter a search term</h2>
              <p>Use the search bar above to find crops, news, market information, and more.</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <h2>No results found</h2>
              <p>We couldn't find any matches for "{query}".</p>
              <div className="search-suggestions">
                <h3>Suggestions:</h3>
                <ul>
                  <li>Check your spelling</li>
                  <li>Try more general keywords</li>
                  <li>Try different keywords</li>
                  <li>
                    Browse our <Link to="/crop-management">Crop Management</Link> section
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="results-list">
              {filteredResults.map((result) => (
                <div key={result.id} className="result-item">
                  {result.image && (
                    <div className="result-image">
                      <img src={result.image || "/placeholder.svg"} alt={result.title} />
                    </div>
                  )}
                  <div className="result-content">
                    <div className="result-type">{result.type.toUpperCase()}</div>
                    <h3 className="result-title">
                      <Link to={result.url}>{result.title}</Link>
                    </h3>
                    <p className="result-description">{result.description}</p>
                    {result.date && <div className="result-date">{result.date}</div>}
                    <Link to={result.url} className="result-link">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
