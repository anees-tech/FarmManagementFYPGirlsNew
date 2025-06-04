"use client"

import { useState } from "react"
import "./Support.css"

const Support = () => {
  const [activeCategory, setActiveCategory] = useState("general")
  const [searchTerm, setSearchTerm] = useState("")

  // Sample FAQ data
  const faqData = {
    general: [
      {
        question: "What is FarmConnect?",
        answer:
          "FarmConnect is a comprehensive platform designed to help farmers manage their crops, access market information, stay updated with agricultural news, and connect with other farmers and experts in the field.",
      },
      {
        question: "How do I create an account?",
        answer:
          'To create an account, click on the "Register" button in the top right corner of the homepage. Fill in your details including name, email, password, farm type, and location. Once submitted, you\'ll have immediate access to your dashboard.',
      },
      {
        question: "Is FarmConnect free to use?",
        answer:
          "FarmConnect offers both free and premium subscription options. The basic features are available for free, while advanced features such as detailed market analytics, personalized crop recommendations, and priority support require a premium subscription.",
      },
    ],
    account: [
      {
        question: "How do I reset my password?",
        answer:
          'To reset your password, click on the "Login" button, then select "Forgot Password". Enter your registered email address, and we\'ll send you a link to reset your password.',
      },
      {
        question: "Can I have multiple farms under one account?",
        answer:
          'Yes, you can manage multiple farms under a single account. In your dashboard, go to "Settings" and select "Manage Farms" to add or edit farm profiles.',
      },
      {
        question: "How do I update my profile information?",
        answer:
          'To update your profile, log in to your account and go to the "Dashboard". Click on your profile picture or name in the top right corner, then select "Edit Profile". Make your changes and click "Save" to update your information.',
      },
    ],
    crops: [
      {
        question: "How do I add a new crop to my farm?",
        answer:
          'To add a new crop, go to your Dashboard and select the "My Crops" tab. Click on the "Add New Crop" button, fill in the details about your crop including name, area, planting date, and expected harvest date, then click "Save".',
      },
      {
        question: "Where can I find information about specific crops?",
        answer:
          'You can find detailed information about specific crops in the "Crop Management" section. Browse through the categories or use the search function to find the crop you\'re interested in. Each crop page contains information about planting, care, harvesting, and common pests and diseases.',
      },
      {
        question: "How accurate is the crop information provided?",
        answer:
          "Our crop information is compiled from reputable agricultural research institutions, extension services, and experienced farmers. We regularly update our database to ensure the information is accurate and reflects current best practices.",
      },
    ],
    market: [
      {
        question: "How often are market prices updated?",
        answer:
          "Market prices are updated daily during weekdays. The data is sourced from major agricultural markets and commodity exchanges to provide you with the most current information.",
      },
      {
        question: "Can I get notifications for price changes?",
        answer:
          "Yes, premium users can set up price alerts for specific crops. When the price reaches your specified threshold, you'll receive an email or SMS notification depending on your preferences.",
      },
      {
        question: "How can I use the market trends information?",
        answer:
          "Market trends information can help you make informed decisions about when to sell your crops, what crops to plant in the upcoming season, and how to negotiate better prices with buyers. The historical data and forecasts provide valuable insights into market behavior.",
      },
    ],
    technical: [
      {
        question: "Which browsers are supported?",
        answer:
          "FarmConnect works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.",
      },
      {
        question: "Is there a mobile app available?",
        answer:
          'Yes, we have mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store by searching for "FarmConnect".',
      },
      {
        question: "What should I do if I encounter a technical issue?",
        answer:
          'If you encounter a technical issue, first try refreshing the page or clearing your browser cache. If the problem persists, please contact our support team through the "Contact Us" page or email support@farmconnect.com with details about the issue, including screenshots if possible.',
      },
    ],
  }

  // Filter FAQs based on search term
  const filterFAQs = () => {
    if (!searchTerm.trim()) {
      return faqData[activeCategory]
    }

    const term = searchTerm.toLowerCase()
    let results = []

    // Search in all categories
    Object.values(faqData).forEach((category) => {
      const matches = category.filter(
        (faq) => faq.question.toLowerCase().includes(term) || faq.answer.toLowerCase().includes(term),
      )
      results = [...results, ...matches]
    })

    return results
  }

  const filteredFAQs = filterFAQs()

  return (
    <div className="support-page">
      <div className="support-hero">
        <div className="container">
          <h1 className="support-hero-title">Support & FAQ</h1>
          <p className="support-hero-subtitle">Find answers to common questions and get the help you need.</p>

          <div className="support-search">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="support-search-input"
            />
            <button className="support-search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="support-content">
          <div className="faq-categories">
            <h2>Categories</h2>
            <ul className="category-list">
              <li>
                <button
                  className={`category-btn ${activeCategory === "general" ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory("general")
                    setSearchTerm("")
                  }}
                >
                  General Information
                </button>
              </li>
              <li>
                <button
                  className={`category-btn ${activeCategory === "account" ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory("account")
                    setSearchTerm("")
                  }}
                >
                  Account & Profile
                </button>
              </li>
              <li>
                <button
                  className={`category-btn ${activeCategory === "crops" ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory("crops")
                    setSearchTerm("")
                  }}
                >
                  Crop Management
                </button>
              </li>
              <li>
                <button
                  className={`category-btn ${activeCategory === "market" ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory("market")
                    setSearchTerm("")
                  }}
                >
                  Market & Pricing
                </button>
              </li>
              <li>
                <button
                  className={`category-btn ${activeCategory === "technical" ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory("technical")
                    setSearchTerm("")
                  }}
                >
                  Technical Issues
                </button>
              </li>
            </ul>

            <div className="support-contact-box">
              <h3>Need More Help?</h3>
              <p>If you can't find the answer you're looking for, our support team is here to help.</p>
              <a href="/contact" className="btn support-contact-btn">
                Contact Support
              </a>
            </div>
          </div>

          <div className="faq-content">
            <h2>
              {searchTerm
                ? "Search Results"
                : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} FAQs`}
            </h2>

            {filteredFAQs.length === 0 ? (
              <div className="no-results">
                <p>No results found for "{searchTerm}".</p>
                <p>
                  Try using different keywords or <a href="/contact">contact our support team</a> for assistance.
                </p>
              </div>
            ) : (
              <div className="faq-list">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <div className="faq-question">
                      <h3>{faq.question}</h3>
                      <div className="faq-toggle">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="support-resources">
              <h3>Additional Resources</h3>
              <div className="resources-grid">
                <a href="#" className="resource-card">
                  <div className="resource-icon">
                    <i className="fas fa-book"></i>
                  </div>
                  <h4>User Guide</h4>
                  <p>Comprehensive guide to using all features of FarmConnect</p>
                </a>

                <a href="#" className="resource-card">
                  <div className="resource-icon">
                    <i className="fas fa-video"></i>
                  </div>
                  <h4>Video Tutorials</h4>
                  <p>Step-by-step video guides for common tasks</p>
                </a>

                <a href="#" className="resource-card">
                  <div className="resource-icon">
                    <i className="fas fa-download"></i>
                  </div>
                  <h4>Downloads</h4>
                  <p>Templates, guides, and other useful resources</p>
                </a>

                <a href="#" className="resource-card">
                  <div className="resource-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4>Community Forum</h4>
                  <p>Connect with other farmers and share knowledge</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
