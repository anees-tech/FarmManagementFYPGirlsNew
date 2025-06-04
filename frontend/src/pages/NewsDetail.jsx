import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './NewsDetail.css';

const API_URL = 'http://localhost:5000/api';

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchArticle();
      window.scrollTo(0, 0);
    }
  }, [slug]);

  useEffect(() => {
    if (article) {
      fetchRelatedArticles();
    }
  }, [article]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/news/slug/${slug}`);
      setArticle(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching article:', error);
      if (error.response?.status === 404) {
        setError('Article not found');
      } else {
        setError('Failed to load article');
        // Show demo content for development
        setArticle(getDemoArticle());
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const response = await axios.get(`${API_URL}/news?category=${article.category}&limit=4`);
      const filtered = response.data.news?.filter(item => item._id !== article._id) || [];
      setRelatedArticles(filtered.slice(0, 3));
    } catch (error) {
      console.error('Error fetching related articles:', error);
      // Show demo related articles
      setRelatedArticles(getDemoRelatedArticles());
    }
  };

  const getDemoArticle = () => {
    return {
      _id: 'demo-1',
      title: 'Revolutionary Drone Technology Transforms Modern Agriculture',
      slug: 'drone-technology-modern-agriculture',
      content: `
        <p>The agricultural sector is experiencing a technological revolution with the introduction of advanced drone technology. These unmanned aerial vehicles are transforming how farmers monitor crops, manage resources, and optimize yields.</p>
        
        <h3>Key Benefits of Agricultural Drones</h3>
        <p>Modern agricultural drones offer numerous advantages that are revolutionizing farming practices:</p>
        
        <ul>
          <li><strong>Precision Crop Monitoring:</strong> Drones equipped with high-resolution cameras and sensors can detect crop health issues, pest infestations, and nutrient deficiencies with remarkable accuracy.</li>
          <li><strong>Efficient Resource Management:</strong> GPS-guided drones can apply fertilizers, pesticides, and water with precision, reducing waste and environmental impact.</li>
          <li><strong>Time and Cost Savings:</strong> What once took days of manual inspection can now be completed in hours, significantly reducing labor costs.</li>
          <li><strong>Data-Driven Decisions:</strong> Real-time data collection enables farmers to make informed decisions about crop management and resource allocation.</li>
        </ul>
        
        <h3>Advanced Features and Capabilities</h3>
        <p>Today's agricultural drones come equipped with cutting-edge technology:</p>
        
        <p><strong>Multispectral Imaging:</strong> Advanced cameras can capture images in multiple light spectrums, revealing crop health information invisible to the naked eye. This technology helps identify stressed plants before symptoms become visible.</p>
        
        <p><strong>Thermal Sensors:</strong> Heat-sensing capabilities allow farmers to monitor irrigation efficiency and detect areas of water stress or equipment malfunctions.</p>
        
        <p><strong>AI-Powered Analytics:</strong> Machine learning algorithms analyze drone-collected data to provide actionable insights and predictive analytics for crop management.</p>
        
        <h3>Implementation Success Stories</h3>
        <p>Farmers across India are already experiencing significant benefits from drone adoption. In Punjab, wheat farmers have reported 15% yield increases after implementing drone-based crop monitoring. Similarly, cotton farmers in Gujarat have reduced pesticide usage by 30% while maintaining crop quality.</p>
        
        <p>The technology is particularly beneficial for large-scale operations where manual monitoring becomes impractical. However, small and medium farmers are also finding value through drone service providers who offer aerial monitoring as a service.</p>
        
        <h3>Future Outlook</h3>
        <p>As drone technology continues to evolve, we can expect even more sophisticated features including automated crop spraying, seed planting capabilities, and integration with IoT sensors for comprehensive farm management systems.</p>
        
        <p>The government's recent initiatives to promote drone adoption in agriculture, including subsidies and training programs, are expected to accelerate the technology's adoption across the country.</p>
      `,
      excerpt: 'Advanced drone technology is revolutionizing agriculture with precision monitoring, efficient resource management, and data-driven farming decisions.',
      author: 'Tech Agriculture Team',
      category: 'technology',
      tags: ['drone', 'technology', 'precision-agriculture', 'innovation'],
      featuredImage: '/images/agricultural-drone.jpg',
      imageAlt: 'Agricultural drone flying over crop field',
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date().toISOString(),
      views: 1234,
      likes: 89,
      readTime: 8,
      priority: 'high',
      metaDescription: 'Discover how drone technology is transforming modern agriculture with precision monitoring and data-driven farming solutions.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  const getDemoRelatedArticles = () => {
    return [
      {
        _id: 'demo-2',
        title: 'Smart Irrigation Systems: The Future of Water Management',
        slug: 'smart-irrigation-water-management',
        excerpt: 'IoT-enabled irrigation systems are helping farmers optimize water usage while maintaining crop health.',
        featuredImage: '/images/smart-irrigation.jpg',
        category: 'technology',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        readTime: 5
      },
      {
        _id: 'demo-3',
        title: 'AI in Agriculture: Predicting Crop Diseases Before They Strike',
        slug: 'ai-agriculture-crop-disease-prediction',
        excerpt: 'Machine learning algorithms are being used to predict and prevent crop diseases, saving farmers billions in losses.',
        featuredImage: '/images/ai-crop-disease.jpg',
        category: 'technology',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        readTime: 6
      },
      {
        _id: 'demo-4',
        title: 'Blockchain Technology in Agricultural Supply Chain',
        slug: 'blockchain-agricultural-supply-chain',
        excerpt: 'How blockchain is creating transparency and trust in the agricultural supply chain from farm to consumer.',
        featuredImage: '/images/blockchain-agriculture.jpg',
        category: 'technology',
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        readTime: 7
      }
    ];
  };

  const handleLike = async () => {
    try {
      await axios.post(`${API_URL}/news/${article._id}/like`);
      setArticle(prev => ({ ...prev, likes: prev.likes + 1 }));
      setLiked(true);
    } catch (error) {
      console.error('Error liking article:', error);
      // For demo, just update the state
      setArticle(prev => ({ ...prev, likes: prev.likes + 1 }));
      setLiked(true);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
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

  if (loading) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="loading">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error && !article) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Article Not Found</h2>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/news-events" className="btn">
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/news-events">News & Events</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="article-header">
          <div className="article-meta-top">
            <span 
              className="category-tag" 
              style={{ backgroundColor: getCategoryColor(article.category) }}
            >
              {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <div className="priority-badge">
              {getPriorityIcon(article.priority)}
            </div>
            {isAdmin && (
              <Link 
                to={`/admin/news/edit/${article._id}`} 
                className="edit-article-btn"
              >
                <i className="fas fa-edit"></i>
                Edit Article
              </Link>
            )}
          </div>

          <h1 className="article-title">{article.title}</h1>
          
          <div className="article-meta">
            <div className="author-info">
              <div className="author-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="author-details">
                <span className="author-name">By {article.author}</span>
                <span className="publish-date">{formatDate(article.publishedAt)}</span>
              </div>
            </div>
            
            <div className="article-stats">
              <span className="read-time">
                <i className="fas fa-clock"></i>
                {article.readTime} min read
              </span>
              <span className="views">
                <i className="fas fa-eye"></i>
                {formatViews(article.views)} views
              </span>
              <button 
                className={`like-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
                disabled={liked}
              >
                <i className="fas fa-heart"></i>
                {article.likes}
              </button>
            </div>
          </div>

          {article.featuredImage && (
            <div className="featured-image">
              <img 
                src={article.featuredImage} 
                alt={article.imageAlt || article.title}
                onError={(e) => {
                  e.target.src = '/images/default-news.jpg';
                }}
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="article-layout">
          <main className="article-main">
            <div className="article-content">
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <p>{article.excerpt}</p>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="article-tags">
                <h4>Tags:</h4>
                <div className="tags-list">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="article-share">
              <h4>Share this article:</h4>
              <div className="share-buttons">
                <button 
                  className="share-btn facebook"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                >
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </button>
                <button 
                  className="share-btn twitter"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`, '_blank')}
                >
                  <i className="fab fa-twitter"></i>
                  Twitter
                </button>
                <button 
                  className="share-btn linkedin"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                >
                  <i className="fab fa-linkedin-in"></i>
                  LinkedIn
                </button>
                <button 
                  className="share-btn whatsapp"
                  onClick={() => window.open(`https://wa.me/?text=${article.title} ${window.location.href}`, '_blank')}
                >
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp
                </button>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="article-sidebar">
            {/* Navigation */}
            <div className="sidebar-section">
              <Link to="/news-events" className="back-btn">
                <i className="fas fa-arrow-left"></i>
                Back to News
              </Link>
            </div>

            {/* Table of Contents */}
            <div className="sidebar-section">
              <h4>In this article</h4>
              <div className="table-of-contents">
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>
                  Introduction
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('h3')?.scrollIntoView(); }}>
                  Key Benefits
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); }}>
                  Advanced Features
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); }}>
                  Success Stories
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="sidebar-section stats-card">
              <h4>Article Stats</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{formatViews(article.views)}</span>
                  <span className="stat-label">Views</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{article.likes}</span>
                  <span className="stat-label">Likes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{article.readTime}</span>
                  <span className="stat-label">Min Read</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="related-articles">
            <h2>Related Articles</h2>
            <div className="related-grid">
              {relatedArticles.map((relatedArticle) => (
                <article key={relatedArticle._id} className="related-card">
                  <div className="related-image">
                    {relatedArticle.featuredImage ? (
                      <img 
                        src={relatedArticle.featuredImage} 
                        alt={relatedArticle.title}
                        onError={(e) => {
                          e.target.src = '/images/default-news.jpg';
                        }}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <i className="fas fa-newspaper"></i>
                      </div>
                    )}
                  </div>
                  <div className="related-content">
                    <h3>
                      <Link to={`/news/${relatedArticle.slug}`}>
                        {relatedArticle.title}
                      </Link>
                    </h3>
                    <p className="related-excerpt">{relatedArticle.excerpt}</p>
                    <div className="related-meta">
                      <span className="read-time">{relatedArticle.readTime} min read</span>
                      <span className="date">{formatDate(relatedArticle.publishedAt)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Subscription */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get the latest farming news and insights delivered to your inbox</p>
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

export default NewsDetail;