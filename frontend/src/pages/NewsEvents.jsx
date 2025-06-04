"use client"

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import NewsCard from "../components/NewsCard"
import "./NewsEvents.css"

const API_URL = 'http://localhost:5000/api';

const NewsEvents = () => {
  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const { isAdmin } = useAuth();

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'crop-updates', label: 'Crop Updates' },
    { value: 'market-news', label: 'Market News' },
    { value: 'weather-alerts', label: 'Weather Alerts' },
    { value: 'technology', label: 'Technology' },
    { value: 'government-schemes', label: 'Government Schemes' },
    { value: 'farming-tips', label: 'Farming Tips' },
    { value: 'success-stories', label: 'Success Stories' },
    { value: 'research', label: 'Research' },
    { value: 'events', label: 'Events' },
    { value: 'general', label: 'General' }
  ];

  useEffect(() => {
    fetchNews();
    fetchFeaturedNews();
  }, [selectedCategory, searchTerm, currentPage]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        isPublished: 'true',
        page: currentPage.toString(),
        limit: '9',
        sortBy: 'publishedAt',
        sortOrder: 'desc'
      });

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await axios.get(`${API_URL}/news?${params}`);
      setNews(response.data.news || []);
      setPagination(response.data.pagination);
      setError(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please try again.');
      // Load dummy data for demo
      const dummyData = generateDummyNewsData();
      setNews(dummyData);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedNews = async () => {
    try {
      const response = await axios.get(`${API_URL}/news/featured/articles`);
      setFeaturedNews(response.data || []);
    } catch (error) {
      console.error('Error fetching featured news:', error);
      // Load dummy featured news
      const dummyFeatured = generateDummyNewsData().slice(0, 3);
      setFeaturedNews(dummyFeatured);
    }
  };

  const generateDummyNewsData = () => {
    return [
      {
        _id: '1',
        title: 'New Government Scheme for Organic Farming Support',
        slug: 'government-scheme-organic-farming-support',
        excerpt: 'The government announces a comprehensive support package for farmers transitioning to organic farming methods, including subsidies and technical assistance.',
        content: 'Full article content here...',
        author: 'Farm News Team',
        category: 'government-schemes',
        tags: ['organic', 'government', 'subsidies'],
        featuredImage: '/images/organic-farming.jpg',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date().toISOString(),
        views: 1250,
        likes: 45,
        readTime: 5,
        priority: 'high'
      },
      {
        _id: '2',
        title: 'Weather Alert: Heavy Rainfall Expected in Northern States',
        slug: 'weather-alert-heavy-rainfall-northern-states',
        excerpt: 'Meteorological department issues warning for heavy rainfall in Punjab, Haryana, and UP. Farmers advised to take precautionary measures.',
        content: 'Full article content here...',
        author: 'Weather Team',
        category: 'weather-alerts',
        tags: ['weather', 'rainfall', 'alert'],
        featuredImage: '/images/rainfall-alert.jpg',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        views: 890,
        likes: 32,
        readTime: 3,
        priority: 'urgent'
      },
      {
        _id: '3',
        title: 'Revolutionary Drone Technology for Precision Agriculture',
        slug: 'drone-technology-precision-agriculture',
        excerpt: 'New drone technology promises to revolutionize farming with precise monitoring, spraying, and crop health analysis capabilities.',
        content: 'Full article content here...',
        author: 'Tech Reporter',
        category: 'technology',
        tags: ['drone', 'technology', 'precision'],
        featuredImage: '/images/farming-drone.jpg',
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        views: 678,
        likes: 28,
        readTime: 7,
        priority: 'medium'
      },
      {
        _id: '4',
        title: 'Success Story: From Traditional to Smart Farming',
        slug: 'success-story-traditional-smart-farming',
        excerpt: 'Meet Rajesh Kumar, a farmer from Bihar who transformed his 5-acre farm using smart farming techniques and increased his income by 300%.',
        content: 'Full article content here...',
        author: 'Success Stories',
        category: 'success-stories',
        tags: ['success', 'smart-farming', 'transformation'],
        featuredImage: '/images/smart-farm.jpg',
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        views: 1450,
        likes: 67,
        readTime: 6,
        priority: 'medium'
      },
      {
        _id: '5',
        title: 'Market Update: Wheat Prices Surge Due to Export Demand',
        slug: 'market-update-wheat-prices-surge-export-demand',
        excerpt: 'Wheat prices have increased by 15% this month due to strong international demand and limited supply from major producing regions.',
        content: 'Full article content here...',
        author: 'Market Analyst',
        category: 'market-news',
        tags: ['wheat', 'prices', 'export'],
        featuredImage: '/images/wheat-market.jpg',
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        views: 567,
        likes: 23,
        readTime: 4,
        priority: 'high'
      },
      {
        _id: '6',
        title: 'New Research: Climate-Resistant Crop Varieties',
        slug: 'research-climate-resistant-crop-varieties',
        excerpt: 'Scientists develop new crop varieties that can withstand extreme weather conditions, offering hope for climate-resilient agriculture.',
        content: 'Full article content here...',
        author: 'Research Team',
        category: 'research',
        tags: ['research', 'climate', 'crops'],
        featuredImage: '/images/research-crops.jpg',
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date(Date.now() - 432000000).toISOString(),
        views: 789,
        likes: 34,
        readTime: 8,
        priority: 'medium'
      }
    ];
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchNews();
  };

  const handleLike = async (newsId) => {
    try {
      await axios.post(`${API_URL}/news/${newsId}/like`);
      // Update the likes count in the state
      setNews(prevNews => 
        prevNews.map(item => 
          item._id === newsId 
            ? { ...item, likes: item.likes + 1 }
            : item
        )
      );
    } catch (error) {
      console.error('Error liking news:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'crop-updates': '#4caf50',
      'market-news': '#2196f3',
      'weather-alerts': '#ff9800',
      'technology': '#9c27b0',
      'government-schemes': '#3f51b5',
      'farming-tips': '#8bc34a',
      'success-stories': '#4caf50',
      'research': '#795548',
      'events': '#e91e63',
      'general': '#607d8b'
    };
    return colors[category] || '#666';
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent':
        return '🚨';
      case 'high':
        return '⚡';
      case 'medium':
        return '📝';
      case 'low':
        return '📄';
      default:
        return '📝';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  if (loading && news.length === 0) {
    return (
      <div className="news-page">
        <div className="container">
          <div className="loading">Loading news and events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <div className="container">
        <header className="page-header">
          <h1>News & Events</h1>
          <p>Stay updated with the latest farming news, market trends, and agricultural events</p>
          {isAdmin && (
            <Link to="/admin/news" className="btn admin-btn">
              Manage News & Articles
            </Link>
          )}
        </header>

        {/* Featured News Section */}
        {featuredNews.length > 0 && (
          <section className="featured-news">
            <h2>Featured Stories</h2>
            <div className="featured-grid">
              {featuredNews.map((article) => (
                <article key={article._id} className="featured-card">
                  <div className="featured-image">
                    {article.featuredImage ? (
                      <img 
                        src={article.featuredImage} 
                        alt={article.imageAlt || article.title}
                        onError={(e) => {
                          e.target.src = '/images/default-news.jpg';
                        }}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <i className="fas fa-newspaper"></i>
                      </div>
                    )}
                    <div className="priority-badge">
                      {getPriorityIcon(article.priority)}
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="article-meta">
                      <span 
                        className="category-tag" 
                        style={{ backgroundColor: getCategoryColor(article.category) }}
                      >
                        {categories.find(cat => cat.value === article.category)?.label || article.category}
                      </span>
                      <span className="read-time">{article.readTime} min read</span>
                    </div>
                    <h3>
                      <Link to={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="excerpt">{article.excerpt}</p>
                    <div className="article-footer">
                      <div className="author-date">
                        <span className="author">By {article.author}</span>
                        <span className="date">{formatDate(article.publishedAt)}</span>
                      </div>
                      <div className="engagement">
                        <span className="views">
                          <i className="fas fa-eye"></i>
                          {formatViews(article.views)}
                        </span>
                        <button 
                          className="like-btn"
                          onClick={() => handleLike(article._id)}
                        >
                          <i className="fas fa-heart"></i>
                          {article.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter Section */}
        <section className="news-filters">
          <div className="filters-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Search news and articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>

            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`category-filter ${selectedCategory === category.value ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setCurrentPage(1);
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
            <br />
            <small>Showing demo content for preview</small>
          </div>
        )}

        {/* News Grid */}
        <section className="news-grid-section">
          <h2>Latest Articles</h2>
          
          {news.length === 0 ? (
            <div className="no-news">
              <div className="no-news-icon">
                <i className="fas fa-newspaper"></i>
              </div>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <>
              <div className="news-grid">
                {news.map((article) => (
                  <article key={article._id} className="news-card">
                    <div className="news-image">
                      {article.featuredImage ? (
                        <img 
                          src={article.featuredImage} 
                          alt={article.imageAlt || article.title}
                          onError={(e) => {
                            e.target.src = '/images/default-news.jpg';
                          }}
                        />
                      ) : (
                        <div className="image-placeholder">
                          <i className="fas fa-newspaper"></i>
                        </div>
                      )}
                      <div className="priority-badge">
                        {getPriorityIcon(article.priority)}
                      </div>
                    </div>
                    
                    <div className="news-content">
                      <div className="article-meta">
                        <span 
                          className="category-tag" 
                          style={{ backgroundColor: getCategoryColor(article.category) }}
                        >
                          {categories.find(cat => cat.value === article.category)?.label || article.category}
                        </span>
                        <span className="read-time">{article.readTime} min read</span>
                      </div>
                      
                      <h3 className="news-title">
                        <Link to={`/news/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      
                      <p className="news-excerpt">{article.excerpt}</p>
                      
                      {article.tags && article.tags.length > 0 && (
                        <div className="news-tags">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="tag">#{tag}</span>
                          ))}
                        </div>
                      )}
                      
                      <div className="news-footer">
                        <div className="author-date">
                          <span className="author">By {article.author}</span>
                          <span className="date">{formatDate(article.publishedAt)}</span>
                        </div>
                        <div className="engagement">
                          <span className="views">
                            <i className="fas fa-eye"></i>
                            {formatViews(article.views)}
                          </span>
                          <button 
                            className="like-btn"
                            onClick={() => handleLike(article._id)}
                          >
                            <i className="fas fa-heart"></i>
                            {article.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                    Previous
                  </button>
                  
                  <div className="pagination-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                    <span className="total-items">
                      ({pagination.totalItems} articles)
                    </span>
                  </div>
                  
                  <button
                    className="pagination-btn"
                    disabled={currentPage === pagination.totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Newsletter Subscription */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get the latest farming news and updates delivered to your inbox</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsEvents;
