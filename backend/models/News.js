const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  author: {
    type: String,
    required: true,
    trim: true,
    default: 'Admin'
  },
  category: {
    type: String,
    required: true,
    enum: [
      'crop-updates', 
      'market-news', 
      'weather-alerts', 
      'technology', 
      'government-schemes', 
      'farming-tips', 
      'success-stories',
      'research',
      'events',
      'general'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  featuredImage: {
    type: String,
    trim: true
  },
  imageAlt: {
    type: String,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  metaDescription: {
    type: String,
    maxlength: 160
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Generate slug from title before saving
newsSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    // Clean the title and create a proper slug
    let cleanTitle = this.title.toString().trim();
    
    // Remove any unwanted characters and create a URL-friendly slug
    this.slug = cleanTitle
      .toLowerCase()
      .trim()
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove special characters except hyphens and alphanumeric
      .replace(/[^a-z0-9\-]/g, '')
      // Remove multiple consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Limit length to 100 characters
      .substring(0, 100)
      // Remove trailing hyphen if exists after substring
      .replace(/-+$/, '');
      
    // Ensure slug is not empty - create a fallback
    if (!this.slug || this.slug.length === 0) {
      // Create a more descriptive fallback slug
      this.slug = 'news-article-' + Date.now();
    }
    
    // Add timestamp if slug is too short to make it unique
    if (this.slug.length < 3) {
      this.slug = this.slug + '-' + Date.now();
    }
    
    // Add a random suffix to ensure uniqueness
    if (this.isNew) {
      this.slug = this.slug + '-' + Math.random().toString(36).substr(2, 6);
    }
  }
  
  // Calculate read time based on content length
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  
  // Set published date when publishing
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Index for better search performance
newsSchema.index({ title: 'text', content: 'text', tags: 'text' });
newsSchema.index({ category: 1, isPublished: 1, publishedAt: -1 });
newsSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('News', newsSchema);