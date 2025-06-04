"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SearchBar.css"

const SearchBar = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
      setIsExpanded(false)
    }
  }

  const toggleSearch = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setTimeout(() => document.getElementById("search-input").focus(), 100)
    }
  }

  return (
    <div className={`search-container ${className || ""} ${isExpanded ? "expanded" : ""}`}>
      <form onSubmit={handleSearch} className="search-form">
        <input
          id="search-input"
          type="text"
          placeholder="Search crops, news, guides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <button className="search-toggle" onClick={toggleSearch}>
        <i className={`fas ${isExpanded ? "fa-times" : "fa-search"}`}></i>
      </button>
    </div>
  )
}

export default SearchBar
