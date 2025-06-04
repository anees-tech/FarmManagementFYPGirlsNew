const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news articles (with filters)
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      isPublished, 
      isFeatured, 
      author, 
      search, 
      tags,
      priority,
      page = 1, 
      limit = 10,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;
    
    let filter = {};
    
    // Build filter object
    if (category) filter.category = category;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    if (author) filter.author = new RegExp(author, 'i');
    if (priority) filter.priority = priority;
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }
    
    // Text search
    if (search) {
      filter.$text = { $search: search };
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const news = await News.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await News.countDocuments(filter);
    
    res.json({
      news,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get single news article by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const news = await News.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    });
    
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    
    // Increment views
    news.views += 1;
    await news.save();
    
    res.json(news);
  } catch (err) {
    console.error('Error fetching news article:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get news article by ID (admin)
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json(news);
  } catch (err) {
    console.error('Error fetching news article:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create new news article (admin only)
router.post('/', async (req, res) => {
  try {
    console.log('Received news data:', req.body);
    
    const {
      title,
      content,
      excerpt,
      author = 'Admin',
      category,
      tags = [],
      featuredImage = '',
      imageAlt = '',
      isPublished = false,
      isFeatured = false,
      metaDescription = '',
      priority = 'medium'
    } = req.body;

    // Validate required fields
    if (!title || !content || !excerpt || !category) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, content, excerpt, category' 
      });
    }

    // Clean and validate title
    const cleanTitle = title.toString().trim();
    if (cleanTitle.length === 0) {
      return res.status(400).json({ 
        message: 'Title cannot be empty' 
      });
    }

    // Generate slug manually to ensure it exists
    let slug = cleanTitle
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100)
      .replace(/-+$/, '');

    // Ensure slug is not empty
    if (!slug || slug.length === 0) {
      slug = 'news-article-' + Date.now();
    }

    // Add timestamp to ensure uniqueness
    slug = slug + '-' + Date.now();

    const newsData = {
      title: cleanTitle,
      slug: slug, // Explicitly set the slug
      content: content.toString().trim(),
      excerpt: excerpt.toString().trim(),
      author: author.toString().trim(),
      category,
      tags: Array.isArray(tags) ? tags.map(tag => tag.toString().trim().toLowerCase()).filter(tag => tag.length > 0) : [],
      featuredImage: featuredImage.toString().trim(),
      imageAlt: imageAlt.toString().trim(),
      isPublished: Boolean(isPublished),
      isFeatured: Boolean(isFeatured),
      metaDescription: metaDescription.toString().trim(),
      priority
    };

    console.log('Creating news with cleaned data:', newsData);

    const newNews = new News(newsData);
    const savedNews = await newNews.save();
    
    console.log('News created successfully:', savedNews);
    res.status(201).json(savedNews);
  } catch (err) {
    console.error('Error creating news:', err);
    if (err.code === 11000) {
      // Handle duplicate slug error
      if (err.keyPattern && err.keyPattern.slug) {
        res.status(400).json({ message: 'An article with a similar title already exists. Please use a different title.' });
      } else {
        res.status(400).json({ message: 'A news article with this title already exists' });
      }
    } else if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      res.status(400).json({ message: `Validation Error: ${validationErrors.join(', ')}` });
    } else {
      res.status(500).json({ message: 'Server Error: ' + err.message });
    }
  }
});

// Update news article (admin only)
router.put('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    console.log('Updating news with data:', req.body);

    const updateFields = {};
    const allowedFields = [
      'title', 'content', 'excerpt', 'author', 'category', 'tags',
      'featuredImage', 'imageAlt', 'isPublished', 'isFeatured', 
      'metaDescription', 'priority'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'tags' && Array.isArray(req.body[field])) {
          updateFields[field] = req.body[field].map(tag => tag.trim().toLowerCase());
        } else if (typeof req.body[field] === 'string') {
          updateFields[field] = req.body[field].trim();
        } else {
          updateFields[field] = req.body[field];
        }
      }
    });

    // Update the document
    Object.assign(news, updateFields);
    const updatedNews = await news.save();
    
    console.log('News updated successfully:', updatedNews);
    res.json(updatedNews);
  } catch (err) {
    console.error('Error updating news:', err);
    if (err.code === 11000) {
      res.status(400).json({ message: 'A news article with this title already exists' });
    } else {
      res.status(500).json({ message: 'Server Error: ' + err.message });
    }
  }
});

// Delete news article (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    await News.deleteOne({ _id: req.params.id });
    console.log('News deleted successfully:', req.params.id);
    res.json({ message: 'News article deleted successfully' });
  } catch (err) {
    console.error('Error deleting news:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Like a news article
router.post('/:id/like', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    news.likes += 1;
    await news.save();
    
    res.json({ likes: news.likes });
  } catch (err) {
    console.error('Error liking news:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get news statistics (admin)
router.get('/stats/summary', async (req, res) => {
  try {
    const totalNews = await News.countDocuments();
    const publishedNews = await News.countDocuments({ isPublished: true });
    const featuredNews = await News.countDocuments({ isFeatured: true });
    const draftNews = await News.countDocuments({ isPublished: false });
    
    const categoryStats = await News.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const priorityStats = await News.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    const totalViews = await News.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    const totalLikes = await News.aggregate([
      { $group: { _id: null, total: { $sum: '$likes' } } }
    ]);

    res.json({
      totalNews,
      publishedNews,
      featuredNews,
      draftNews,
      categoryStats,
      priorityStats,
      totalViews: totalViews[0]?.total || 0,
      totalLikes: totalLikes[0]?.total || 0
    });
  } catch (err) {
    console.error('Error fetching news stats:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get featured news
router.get('/featured/articles', async (req, res) => {
  try {
    const featuredNews = await News.find({ 
      isFeatured: true, 
      isPublished: true 
    })
    .sort({ publishedAt: -1 })
    .limit(5);
    
    res.json(featuredNews);
  } catch (err) {
    console.error('Error fetching featured news:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get latest news
router.get('/latest/articles', async (req, res) => {
  try {
    const latestNews = await News.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(10);
    
    res.json(latestNews);
  } catch (err) {
    console.error('Error fetching latest news:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;