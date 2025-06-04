"use client";

import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

const API_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin" || path === "/admin/") {
      setActiveTab("overview");
    } else if (path.includes("/admin/crops")) {
      setActiveTab("crops");
    } else if (path.includes("/admin/users")) {
      setActiveTab("users");
    } else if (path.includes("/admin/market-prices")) {
      setActiveTab("market-prices");
    } else if (path.includes("/admin/news")) {
      setActiveTab("news");
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/${tab === "overview" ? "" : tab}`);
  };

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <div className="container">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <p className="admin-dashboard-subtitle">
            Manage crops, users, news, and system settings
          </p>
        </div>
      </div>

      <div className="container admin-dashboard-content">
        <div className="admin-dashboard-nav">
          <Link
            to="/admin"
            className={`admin-nav-link ${
              activeTab === "overview" ? "active" : ""
            }`}
            onClick={() => handleTabClick("overview")}
          >
            Overview
          </Link>
          <Link
            to="/admin/crops"
            className={`admin-nav-link ${
              activeTab === "crops" ? "active" : ""
            }`}
            onClick={() => handleTabClick("crops")}
          >
            Manage Crops
          </Link>
          <Link
            to="/admin/users"
            className={`admin-nav-link ${
              activeTab === "users" ? "active" : ""
            }`}
            onClick={() => handleTabClick("users")}
          >
            Manage Users
          </Link>
          <Link
            to="/admin/market-prices"
            className={`admin-nav-link ${
              activeTab === "market-prices" ? "active" : ""
            }`}
            onClick={() => handleTabClick("market-prices")}
          >
            Market Prices
          </Link>
          <Link
            to="/admin/news"
            className={`admin-nav-link ${
              activeTab === "news" ? "active" : ""
            }`}
            onClick={() => handleTabClick("news")}
          >
            News & Blog
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/crops/*" element={<AdminCrops />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/market-prices/*" element={<AdminMarketPrices />} />
          <Route path="/news/*" element={<AdminNews />} />
        </Routes>
      </div>
    </div>
  );
};

// Admin Overview Component
const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCrops: 0,
    totalUserCrops: 0,
    totalTasks: 0,
    totalNews: 0,
    publishedNews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, cropsRes, newsRes] = await Promise.all([
        axios.get(`${API_URL}/auth/stats`).catch(err => {
          console.error('Users stats error:', err);
          return { data: { totalUsers: 0, totalUserCrops: 0, totalTasks: 0 } };
        }),
        axios.get(`${API_URL}/crops/stats`).catch(err => {
          console.error('Crops stats error:', err);
          return { data: { totalCrops: 0 } };
        }),
        axios.get(`${API_URL}/news/stats/summary`).catch(err => {
          console.error('News stats error:', err);
          return { data: { totalNews: 0, publishedNews: 0 } };
        })
      ]);

      setStats({
        totalUsers: usersRes.data.totalUsers || 0,
        totalCrops: cropsRes.data.totalCrops || 0,
        totalUserCrops: usersRes.data.totalUserCrops || 0,
        totalTasks: usersRes.data.totalTasks || 0,
        totalNews: newsRes.data.totalNews || 0,
        publishedNews: newsRes.data.publishedNews || 0,
      });
      
      setError(null);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load statistics');
      
      // Set default values when there's an error
      setStats({
        totalUsers: 0,
        totalCrops: 0,
        totalUserCrops: 0,
        totalTasks: 0,
        totalNews: 0,
        publishedNews: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard overview...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <h2 className="admin-section-title">Dashboard Overview</h2>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.totalUsers}</div>
          <div className="admin-stat-label">Registered Users</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.totalCrops}</div>
          <div className="admin-stat-label">Crop Types</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.totalUserCrops}</div>
          <div className="admin-stat-label">User Crops</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.totalTasks}</div>
          <div className="admin-stat-label">User Tasks</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.totalNews}</div>
          <div className="admin-stat-label">Total Articles</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.publishedNews}</div>
          <div className="admin-stat-label">Published Articles</div>
        </div>
      </div>

      <div className="admin-actions-container">
        <h3>Quick Actions</h3>
        <div className="admin-quick-actions">
          <button
            className="btn admin-action-btn"
            onClick={() => (window.location.href = "/admin/crops/add")}
          >
            Add New Crop
          </button>
          <button
            className="btn admin-action-btn"
            onClick={() => (window.location.href = "/crop-management")}
          >
            View Crop Catalog
          </button>
          <button
            className="btn admin-action-btn"
            onClick={() => (window.location.href = "/admin/users")}
          >
            Manage Users
          </button>
          <button
            className="btn admin-action-btn"
            onClick={() => (window.location.href = "/admin/news/add")}
          >
            Add News Article
          </button>
          <button
            className="btn admin-action-btn"
            onClick={() => (window.location.href = "/news-events")}
          >
            View News Portal
          </button>
        </div>
      </div>
    </div>
  );
};

// Admin News Management Component
const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddNews = async (newsData) => {
    try {
      console.log('Submitting news data:', newsData);
      const response = await axios.post(`${API_URL}/news`, newsData);
      if (response.data) {
        alert('News article created successfully!');
        navigate("/admin/news");
        fetchNews();
      }
    } catch (error) {
      console.error('Error adding news:', error);
      let errorMessage = 'Failed to create news article. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid data provided. Please check your inputs and try again.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error occurred. Please try again later.';
      }
      
      alert(errorMessage);
    }
  };

  const handleUpdateNews = async (id, newsData) => {
    try {
      const response = await axios.put(`${API_URL}/news/${id}`, newsData);
      if (response.data) {
        navigate("/admin/news");
        fetchNews();
      }
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/news`);
      setNews(response.data.news || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news articles');
    } finally {
      setLoading(false);
    }
  };

  // Check if we're on the add or edit page
  const isAddPage = location.pathname.includes("/admin/news/add");
  const isEditPage = location.pathname.includes("/admin/news/edit");

  if (isAddPage) {
    return (
      <AdminNewsForm
        onSubmit={handleAddNews}
        isEditing={false}
      />
    );
  }

  if (isEditPage) {
    const newsId = location.pathname.split("/").pop();
    return (
      <AdminNewsForm
        newsId={newsId}
        news={news}
        onSubmit={handleUpdateNews}
        isEditing={true}
      />
    );
  }

  const handleDeleteNews = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`${API_URL}/news/${id}`);
        fetchNews(); // Refresh the list
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/news/${id}`, { isPublished: !currentStatus });
      fetchNews(); // Refresh the list
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading news articles...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="admin-section-header">
        <h2 className="admin-section-title">Manage News & Blog</h2>
        <div className="admin-header-actions">
          <button className="btn" onClick={() => navigate("/admin/news/add")}>
            Add New Article
          </button>
          <button
            className="btn view-catalog-btn"
            onClick={() => navigate("/news-events")}
          >
            View News Portal
          </button>
        </div>
      </div>

      {news.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <i className="fas fa-newspaper"></i>
          </div>
          <p className="admin-empty-text">
            No news articles found. Add your first article to get started.
          </p>
          <button className="btn" onClick={() => navigate("/admin/news/add")}>
            Add New Article
          </button>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Views</th>
                <th>Published</th>
                <th className="admin-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((article) => (
                <tr key={article._id}>
                  <td className="news-title-cell">
                    {article.title}
                    {article.excerpt && (
                      <div className="news-excerpt">{article.excerpt.substring(0, 80)}...</div>
                    )}
                  </td>
                  <td>
                    <span className={`category-badge ${article.category}`}>
                      {article.category}
                    </span>
                  </td>
                  <td>{article.author}</td>
                  <td>
                    <span className={`status-badge ${article.isPublished ? 'published' : 'draft'}`}>
                      {article.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <span className={`featured-badge ${article.isFeatured ? 'featured' : ''}`}>
                      {article.isFeatured ? '⭐ Featured' : '-'}
                    </span>
                  </td>
                  <td>{article.views || 0}</td>
                  <td>
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '-'}
                  </td>
                  <td>
                    <div className="admin-action-buttons">
                      <button
                        className="admin-action-btn view"
                        onClick={() => window.open(`/news/${article.slug}`, '_blank')}
                      >
                        View
                      </button>
                      <button
                        className="admin-action-btn edit"
                        onClick={() => navigate(`/admin/news/edit/${article._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className={`admin-action-btn ${article.isPublished ? 'unpublish' : 'publish'}`}
                        onClick={() => handleTogglePublish(article._id, article.isPublished)}
                      >
                        {article.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDeleteNews(article._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Admin News Form Component
const AdminNewsForm = ({ newsId, news = [], onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "Admin",
    category: "",
    tags: [],
    featuredImage: "",
    imageAlt: "",
    isPublished: false,
    isFeatured: false,
    metaDescription: "",
    priority: "medium"
  });
  const [loading, setLoading] = useState(isEditing);

  const categories = [
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
    if (isEditing && newsId) {
      fetchNewsData();
    }
  }, [isEditing, newsId]);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/news/${newsId}`);
      const newsData = response.data;
      setFormData({
        title: newsData.title || "",
        content: newsData.content || "",
        excerpt: newsData.excerpt || "",
        author: newsData.author || "Admin",
        category: newsData.category || "",
        tags: newsData.tags || [],
        featuredImage: newsData.featuredImage || "",
        imageAlt: newsData.imageAlt || "",
        isPublished: newsData.isPublished || false,
        isFeatured: newsData.isFeatured || false,
        metaDescription: newsData.metaDescription || "",
        priority: newsData.priority || "medium"
      });
    } catch (error) {
      console.error('Error fetching news data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'tags') {
      const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
      setFormData(prev => ({ ...prev, [name]: tagsArray }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data before submission
    const cleanedFormData = {
      ...formData,
      title: formData.title.toString().trim(),
      content: formData.content.toString().trim(),
      excerpt: formData.excerpt.toString().trim(),
      author: formData.author.toString().trim(),
      metaDescription: formData.metaDescription.toString().trim()
    };
    
    // Validate title
    if (!cleanedFormData.title || cleanedFormData.title.length === 0) {
      alert('Please enter a valid title for your article.');
      return;
    }
    
    // Ensure title is reasonable length and doesn't contain only special characters
    if (cleanedFormData.title.length < 3) {
      alert('Title must be at least 3 characters long.');
      return;
    }
    
    if (cleanedFormData.title.length > 200) {
      alert('Title cannot exceed 200 characters.');
      return;
    }
    
    // Ensure required fields are not empty
    if (!cleanedFormData.content || !cleanedFormData.excerpt || !cleanedFormData.category) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Validate excerpt length
    if (cleanedFormData.excerpt.length > 300) {
      alert('Excerpt cannot exceed 300 characters.');
      return;
    }
    
    // Validate meta description length
    if (cleanedFormData.metaDescription.length > 160) {
      alert('Meta description cannot exceed 160 characters.');
      return;
    }
    
    console.log('Submitting cleaned form data:', cleanedFormData);
    
    if (isEditing) {
      onSubmit(newsId, cleanedFormData);
    } else {
      onSubmit(cleanedFormData);
    }
  };

  if (loading) {
    return <div className="loading">Loading article data...</div>;
  }

  return (
    <div className="admin-news-form">
      <h2>{isEditing ? "Edit Article" : "Add New Article"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Article Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-control"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="form-control"
            rows="3"
            maxLength="300"
            required
          ></textarea>
          <small>{formData.excerpt.length}/300 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            rows="10"
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="featuredImage">Featured Image URL</label>
            <input
              type="url"
              id="featuredImage"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageAlt">Image Alt Text</label>
            <input
              type="text"
              id="imageAlt"
              name="imageAlt"
              value={formData.imageAlt}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleChange}
            className="form-control"
            placeholder="farming, technology, tips"
          />
        </div>

        <div className="form-group">
          <label htmlFor="metaDescription">Meta Description</label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            className="form-control"
            rows="2"
            maxLength="160"
          ></textarea>
          <small>{formData.metaDescription.length}/160 characters</small>
        </div>

        <div className="form-row">
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              Publish immediately
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Featured article
            </label>
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="btn admin-cancel-btn"
            onClick={() => navigate("/admin/news")}
          >
            Cancel
          </button>
          <button type="submit" className="btn admin-submit-btn">
            {isEditing ? "Update Article" : "Create Article"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Admin Crops Management Component
const AdminCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddCrop = async (cropData) => {
    try {
      console.log("Adding new crop:", cropData);
      const response = await axios.post(`${API_URL}/crops`, cropData);
      setCrops([...crops, response.data]);
      navigate("/admin/crops");
      alert("Crop added successfully!");
    } catch (error) {
      console.error("Error adding crop:", error);
      alert("Failed to add crop. Please try again.");
    }
  };

  const handleUpdateCrop = async (id, cropData) => {
    try {
      console.log("Updating crop:", id, cropData);
      const response = await axios.put(`${API_URL}/crops/${id}`, cropData);
      setCrops(
        crops.map((crop) =>
          crop._id === id || crop.id === id ? response.data : crop
        )
      );
      navigate("/admin/crops");
      alert("Crop updated successfully!");
    } catch (error) {
      console.error("Error updating crop:", error);
      alert("Failed to update crop. Please try again.");
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching all crops for admin");
      const response = await axios.get(`${API_URL}/crops`);
      console.log("Admin crops response:", response.data);
      setCrops(response.data || []);
    } catch (error) {
      console.error("Error fetching crops:", error);
      setError("Failed to load crops. Please try again.");

      // For demo purposes, load from local data if API fails
      import("../data/crops").then((module) => {
        setCrops(module.default);
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if we're on the add or edit page
  const isAddPage = location.pathname.includes("/admin/crops/add");
  const isEditPage = location.pathname.includes("/admin/crops/edit");

  if (isAddPage) {
    return <AdminCropForm onSubmit={handleAddCrop} />;
  }

  if (isEditPage) {
    const cropId = location.pathname.split("/").pop();
    return (
      <AdminCropForm
        cropId={cropId}
        crops={crops}
        onSubmit={handleUpdateCrop}
        isEditing
      />
    );
  }

  const handleDeleteCrop = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this crop? This action cannot be undone."
      )
    ) {
      try {
        console.log("Deleting crop:", id);
        await axios.delete(`${API_URL}/crops/${id}`);
        setCrops(crops.filter((crop) => crop._id !== id && crop.id !== id));
        alert("Crop deleted successfully!");
      } catch (error) {
        console.error("Error deleting crop:", error);
        alert("Failed to delete crop. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading crops...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="admin-section-header">
        <h2 className="admin-section-title">Manage Crops</h2>
        <div className="admin-header-actions">
          <button className="btn" onClick={() => navigate("/admin/crops/add")}>
            Add New Crop
          </button>
          <button
            className="btn view-catalog-btn"
            onClick={() => navigate("/crop-management")}
          >
            View Crop Catalog
          </button>
        </div>
      </div>

      {/* <div className="admin-search-filter">
        <input type="text" placeholder="Search crops..." className="admin-search-input" />
        <select className="admin-filter-select">
          <option value="">All Categories</option>
          <option value="grain">Grains</option>
          <option value="vegetable">Vegetables</option>
          <option value="fruit">Fruits</option>
          <option value="legume">Legumes</option>
        </select>
        <button className="admin-search-btn">Search</button>
      </div> */}

      {crops.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <i className="fas fa-seedling"></i>
          </div>
          <p className="admin-empty-text">
            No crops found. Add your first crop to get started.
          </p>
          <button className="btn" onClick={() => navigate("/admin/crops/add")}>
            Add New Crop
          </button>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Season</th>
                <th>Duration</th>
                <th className="admin-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop.id || crop._id}>
                  <td>{crop.name}</td>
                  <td>{crop.category}</td>
                  <td>{crop.season}</td>
                  <td>{crop.duration}</td>
                  <td>
                    <div className="admin-action-buttons">
                      <button
                        className="admin-action-btn view"
                        onClick={() =>
                          navigate(`/crop/${crop.slug || crop.id}`)
                        }
                      >
                        View
                      </button>
                      <button
                        className="admin-action-btn edit"
                        onClick={() =>
                          navigate(`/admin/crops/edit/${crop.id || crop._id}`)
                        }
                      >
                       // Edit
                      </button>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDeleteCrop(crop.id || crop._id)}
                      >//
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Admin Crop Form Component
const AdminCropForm = ({ cropId, crops = [], onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    // scientificName: "",
    season: "",
    duration: "",
    category: "",
    description: "",
    // fullDescription: "",
    planting: "",
    care: "",
    farmerName: "", // change 1
     harvesting: "",
    // pests: "",
    images: [],
  });
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing && cropId) {
      console.log("Editing crop with ID:", cropId);
      console.log("Available crops:", crops);

      const cropToEdit = crops.find(
        (crop) =>
          (crop.id && crop.id.toString() === cropId) ||
          (crop._id && crop._id.toString() === cropId)
      );

      if (cropToEdit) {
        console.log("Found crop to edit:", cropToEdit);
        setFormData({
          name: cropToEdit.name || "",
          // scientificName: cropToEdit.scientificName || "",
          season: cropToEdit.season || "",
          duration: cropToEdit.duration || "",
          category: cropToEdit.category || "",
          description: cropToEdit.description || "",
          // fullDescription: cropToEdit.fullDescription || "",
          planting: cropToEdit.planting || "",
          care: cropToEdit.care || "",
          farmerName: cropToEdit.farmerName || "", // change 2
          harvesting: cropToEdit.harvesting || "",
          // pests: cropToEdit.pests || "",
          images: cropToEdit.images || [],
        });
      } else {
        console.log("Crop not found in local data, fetching from API");
        // If not found in local state, try to fetch from API
        axios
          .get(`${API_URL}/crops/${cropId}`)
          .then((response) => {
            const cropData = response.data;
            console.log("Fetched crop data:", cropData);
            setFormData({
              name: cropData.name || "",
              // scientificName: cropData.scientificName || "",
              season: cropData.season || "",
              duration: cropData.duration || "",
              category: cropData.category || "",
              description: cropData.description || "",
              // fullDescription: cropData.fullDescription || "",
              planting: cropData.planting || "",
              care: cropData.care || "",
              farmerName: cropData.farmerName || "", //change 3
               harvesting: cropData.harvesting || "",
              // pests: cropData.pests || "",
              images: cropData.images || [],
            });
          })
          .catch((error) => {
            console.error("Error fetching crop for editing:", error);
            alert("Failed to load crop data for editing");
          });
      }
      setLoading(false);
    }
  }, [isEditing, cropId, crops]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate slug if not editing
    const dataToSubmit = { ...formData };
    if (!isEditing) {
      dataToSubmit.slug = formData.name.toLowerCase().replace(/\s+/g, "-");
    }

    console.log("Submitting crop data:", dataToSubmit);

    if (isEditing) {
      onSubmit(cropId, dataToSubmit);
    } else {
      onSubmit(dataToSubmit);
    }
  };

  if (loading) {
    return <div className="loading">Loading crop data...</div>;
  }

  return (
    <div className="admin-crop-form">
      <h2>{isEditing ? "Edit Crop" : "Add New Crop"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Crop Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="scientificName">Scientific Name</label>
            <input
              type="text"
              id="scientificName"
              name="scientificName"
              value={formData.scientificName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div> */}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Category</option>
                <option value="grain">Grain</option>
                <option value="vegetable">Vegetable</option>
                <option value="fruit">Fruit</option>
                <option value="legume">Legume</option>
                <option value="fiber">Fiber</option>
                <option value="cash">Cash Crop</option>
                <option value="hello">Hellow</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="season">Growing Season</label>
              <input
                type="text"
                id="season"
                name="season"
                value={formData.season}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="images">Image URL</label>
              <input
                type="text"
                id="images"
                name="images"
                value={formData.images[0] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, images: [e.target.value] })
                }
                className="form-control"
                placeholder="Enter primary image URL"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Short Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* <div className="form-group">
          <label htmlFor="fullDescription">Full Description</label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div> */}

          <div className="form-group">
            <label htmlFor="planting">Planting Instructions</label>
            <textarea
              id="planting"
              name="planting"
              value={formData.planting}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="care">Care Instructions</label>
            <textarea
              id="care"
              name="care"
              value={formData.care}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="form-group">
            {" "}
            {/** change 4 */}
            <label htmlFor="farmerName">Farmer Name</label>
            <input
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              className="form-control"
              required
            ></input>
          </div>
          {
        <div className="form-group">
          <label htmlFor="harvesting">Harvesting Instructions</label>
          <textarea
            id="harvesting"
            name="harvesting"
            value={formData.harvesting}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>}

          {/* <div className="form-group">
          <label htmlFor="pests">Pests & Diseases</label>
          <textarea
            id="pests"
            name="pests"
            value={formData.pests}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div> */}
        </div>
        <div className="form-buttons">
          <button
            type="button"
            className="btn admin-cancel-btn"
            onClick={() => navigate("/admin/crops")}
          >
            Cancel
          </button>
          <button type="submit" className="btn admin-submit-btn">
            {isEditing ? "Update Crop" : "Add Crop"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Admin Users Management Component
const AdminUsers = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    farmType: "",
    location: "",
    isAdmin: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // In a real app, you would fetch users from your API
        const response = await axios.get(`${API_URL}/auth/users`);
        setUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again.");

        // Mock data for demo
        setUsers([
          {
            id: 1,
            fullName: "John Doe",
            email: "john@example.com",
            farmType: "Crop Farming",
            location: "California",
            isAdmin: false,
          },
          {
            id: 2,
            fullName: "Jane Smith",
            email: "jane@example.com",
            farmType: "Mixed Farming",
            location: "Texas",
            isAdmin: false,
          },
          {
            id: 3,
            fullName: "Admin User",
            email: "admin@example.com",
            farmType: "Organic Farming",
            location: "New York",
            isAdmin: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleAdmin = async (userId, currentStatus) => {
    try {
      await axios.put(`${API_URL}/auth/users/${userId}`, {
        isAdmin: !currentStatus,
      });

      // Update the users list with the updated user
      setUsers(
        users.map((user) =>
          user.id === userId || user._id === userId
            ? { ...user, isAdmin: !currentStatus }
            : user
        )
      );

      alert(
        `User ${
          currentStatus ? "removed from" : "promoted to"
        } admin role successfully!`
      );
    } catch (error) {
      console.error("Error updating user admin status:", error);
      alert("Failed to update user status. Please try again.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(`${API_URL}/auth/users/${userId}`);
        setUsers(
          users.filter((user) => user.id !== userId && user._id !== userId)
        );
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditFormData({
      fullName: user.fullName,
      email: user.email,
      farmType: user.farmType,
      location: user.location,
      isAdmin: user.isAdmin,
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditFormData({
      fullName: "",
      email: "",
      farmType: "",
      location: "",
      isAdmin: false,
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make API call to update user
      await axios.put(
        `${API_URL}/auth/users/${editingUser.id || editingUser._id}`,
        editFormData
      );

      // Update the users list with the updated user
      setUsers(
        users.map((user) =>
          user.id === editingUser.id || user._id === editingUser._id
            ? { ...user, ...editFormData }
            : user
        )
      );

      alert("User updated successfully!");
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="admin-section-header">
        <h2 className="admin-section-title">Manage Users</h2>
      </div>

      {editingUser ? (
        <div className="admin-form-container">
          <h3>Edit User</h3>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={editFormData.fullName}
                onChange={handleEditFormChange}
                className="admin-form-control"
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditFormChange}
                className="admin-form-control"
                disabled // Disable editing email for simplicity
              />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="farmType">Farm Type</label>
              <input
                type="text"
                id="farmType"
                name="farmType"
                value={editFormData.farmType}
                onChange={handleEditFormChange}
                className="admin-form-control"
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={editFormData.location}
                onChange={handleEditFormChange}
                className="admin-form-control"
              />
            </div>
          </div>
          <div className="admin-form-group">
            <label htmlFor="isAdmin">Is Admin</label>
            <select
              id="isAdmin"
              name="isAdmin"
              value={editFormData.isAdmin}
              onChange={handleEditFormChange}
              className="admin-form-control"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="admin-form-buttons">
            <button className="btn admin-cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
            <button className="btn admin-submit-btn" onClick={handleUpdateUser}>
              Update User
            </button>
          </div>
        </div>
      ) : users.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <i className="fas fa-users"></i>
          </div>
          <p className="admin-empty-text">No users found.</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Farm Type</th>
                <th>Location</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id || user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.farmType}</td>
                  <td>{user.location}</td>
                  <td>
                    <span className={user.isAdmin ? "admin-badge" : ""}>
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-action-buttons">
                      {/* <button
                        className="admin-action-btn edit"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>*/}
                      <button
                        className="admin-action-btn edit"
                        onClick={() =>
                          handleToggleAdmin(user.id || user._id, user.isAdmin)
                        }
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </button>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDeleteUser(user.id || user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Admin Market Prices Management Component
const AdminMarketPrices = () => {
  const [marketPrices, setMarketPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddMarketPrice = async (priceData) => {
    try {
      console.log("Adding new market price:", priceData);
      const response = await axios.post(`${API_URL}/market-prices`, priceData);
      setMarketPrices([...marketPrices, response.data]);
      navigate("/admin/market-prices");
      alert("Market price added successfully!");
    } catch (error) {
      console.error("Error adding market price:", error);
      alert("Failed to add market price. Please try again.");
    }
  };

  const handleUpdateMarketPrice = async (id, priceData) => {
    try {
      console.log("Updating market price:", id, priceData);
      const response = await axios.put(`${API_URL}/market-prices/${id}`, priceData);
      setMarketPrices(
        marketPrices.map((price) =>
          price._id === id || price.id === id ? response.data : price
        )
      );
      navigate("/admin/market-prices");
      alert("Market price updated successfully!");
    } catch (error) {
      console.error("Error updating market price:", error);
      alert("Failed to update market price. Please try again.");
    }
  };

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  const fetchMarketPrices = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching all market prices for admin");
      const response = await axios.get(`${API_URL}/market-prices`);
      console.log("Admin market prices response:", response.data);
      setMarketPrices(response.data || []);
    } catch (error) {
      console.error("Error fetching market prices:", error);
      setError("Failed to load market prices. Please try again.");

      // For demo purposes, load dummy data if API fails
      const dummyData = [
        {
          _id: '1',
          cropName: 'Wheat',
          category: 'grain',
          currentPrice: 2850,
          previousPrice: 2720,
          unit: 'per quintal',
          market: 'APMC Pune',
          location: 'Maharashtra',
          quality: 'Premium',
          trend: 'up',
          changePercentage: 4.78,
          lastUpdated: new Date().toISOString(),
          isActive: true,
          notes: 'Good demand due to export orders'
        }
      ];
      setMarketPrices(dummyData);
    } finally {
      setLoading(false);
    }
  };

  // Check if we're on the add or edit page
  const isAddPage = location.pathname.includes("/admin/market-prices/add");
  const isEditPage = location.pathname.includes("/admin/market-prices/edit");

  if (isAddPage) {
    return <AdminMarketPriceForm onSubmit={handleAddMarketPrice} />;
  }

  if (isEditPage) {
    const priceId = location.pathname.split("/").pop();
    return (
      <AdminMarketPriceForm
        priceId={priceId}
        marketPrices={marketPrices}
        onSubmit={handleUpdateMarketPrice}
        isEditing
      />
    );
  }

  const handleDeleteMarketPrice = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this market price? This action cannot be undone."
      )
    ) {
      try {
        console.log("Deleting market price:", id);
        await axios.delete(`${API_URL}/market-prices/${id}`);
        setMarketPrices(marketPrices.filter((price) => price._id !== id && price.id !== id));
        alert("Market price deleted successfully!");
      } catch (error) {
        console.error("Error deleting market price:", error);
        alert("Failed to delete market price. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading market prices...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="admin-section-header">
        <h2 className="admin-section-title">Manage Market Prices</h2>
        <div className="admin-header-actions">
          <button className="btn" onClick={() => navigate("/admin/market-prices/add")}>
            Add New Price
          </button>
          <button
            className="btn view-catalog-btn"
            onClick={() => navigate("/market-info")}
          >
            View Market Info
          </button>
        </div>
      </div>

      {marketPrices.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <p className="admin-empty-text">
            No market prices found. Add your first market price to get started.
          </p>
          <button className="btn" onClick={() => navigate("/admin/market-prices/add")}>
            Add New Market Price
          </button>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Category</th>
                <th>Current Price</th>
                <th>Market</th>
                <th>Location</th>
                <th>Trend</th>
                <th>Status</th>
                <th className="admin-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marketPrices.map((price) => (
                <tr key={price.id || price._id}>
                  <td>{price.cropName}</td>
                  <td>{price.category}</td>
                  <td>₹{price.currentPrice} {price.unit}</td>
                  <td>{price.market}</td>
                  <td>{price.location}</td>
                  <td>
                    <span className={`trend-badge ${price.trend}`}>
                      {price.trend} ({price.changePercentage}%)
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${price.isActive ? 'active' : 'inactive'}`}>
                      {price.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-action-buttons">
                      <button
                        className="admin-action-btn edit"
                        onClick={() =>
                          navigate(`/admin/market-prices/edit/${price.id || price._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDeleteMarketPrice(price.id || price._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Admin Market Price Form Component
const AdminMarketPriceForm = ({ priceId, marketPrices = [], onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropName: "",
    category: "",
    currentPrice: "",
    previousPrice: "",
    unit: "per kg",
    market: "",
    location: "",
    quality: "Standard",
    isActive: true,
    notes: ""
  });
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing && priceId) {
      console.log("Editing market price with ID:", priceId);
      console.log("Available market prices:", marketPrices);

      const priceToEdit = marketPrices.find(
        (price) =>
          (price.id && price.id.toString() === priceId) ||
          (price._id && price._id.toString() === priceId)
      );

      if (priceToEdit) {
        console.log("Found market price to edit:", priceToEdit);
        setFormData({
          cropName: priceToEdit.cropName || "",
          category: priceToEdit.category || "",
          currentPrice: priceToEdit.currentPrice || "",
          previousPrice: priceToEdit.previousPrice || "",
          unit: priceToEdit.unit || "per kg",
          market: priceToEdit.market || "",
          location: priceToEdit.location || "",
          quality: priceToEdit.quality || "Standard",
          isActive: priceToEdit.isActive !== undefined ? priceToEdit.isActive : true,
          notes: priceToEdit.notes || ""
        });
      }
      setLoading(false);
    }
  }, [isEditing, priceId, marketPrices]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      currentPrice: parseFloat(formData.currentPrice),
      previousPrice: parseFloat(formData.previousPrice)
    };

    console.log("Submitting market price data:", dataToSubmit);

    if (isEditing) {
      onSubmit(priceId, dataToSubmit);
    } else {
      onSubmit(dataToSubmit);
    }
  };

  if (loading) {
    return <div className="loading">Loading market price data...</div>;
  }

  return (
    <div className="admin-crop-form">
      <h2>{isEditing ? "Edit Market Price" : "Add New Market Price"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cropName">Crop Name</label>
            <input
              type="text"
              id="cropName"
              name="cropName"
              value={formData.cropName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Category</option>
              <option value="grain">Grain</option>
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="legume">Legume</option>
              <option value="fiber">Fiber</option>
              <option value="cash">Cash Crop</option>
              <option value="spices">Spices</option>
              <option value="oilseeds">Oilseeds</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="currentPrice">Current Price</label>
            <input
              type="number"
              id="currentPrice"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              className="form-control"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="previousPrice">Previous Price</label>
            <input
              type="number"
              id="previousPrice"
              name="previousPrice"
              value={formData.previousPrice}
              onChange={handleChange}
              className="form-control"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="per kg">Per Kg</option>
              <option value="per quintal">Per Quintal</option>
              <option value="per ton">Per Ton</option>
              <option value="per dozen">Per Dozen</option>
              <option value="per piece">Per Piece</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quality">Quality</label>
            <select
              id="quality"
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="market">Market</label>
            <input
              type="text"
              id="market"
              name="market"
              value={formData.market}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., APMC Pune, Koyambedu Market"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., Maharashtra, Tamil Nadu"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="Additional notes about the market price, trends, demand, etc."
          ></textarea>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="btn admin-cancel-btn"
            onClick={() => navigate("/admin/market-prices")}
          >
            Cancel
          </button>
          <button type="submit" className="btn admin-submit-btn">
            {isEditing ? "Update Price" : "Add Price"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;
