import React from 'react'
import { motion } from 'framer-motion'
import './AboutUs.css'

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      position: "Agricultural Scientist",
      image: "/api/placeholder/300/300",
      description: "Expert in sustainable farming practices with 15+ years of experience."
    },
    {
      name: "Michael Chen",
      position: "Technology Director",
      image: "/img/rice.webp",
      description: "Leading the digital transformation of modern agriculture."
    },
    {
      name: "Emma Rodriguez",
      position: "Market Analyst",
      image: "/api/placeholder/300/300",
      description: "Specialized in agricultural market trends and economic forecasting."
    },
    {
      name: "James Wilson",
      position: "Sustainability Expert",
      image: "/api/placeholder/300/300",
      description: "Focused on eco-friendly farming solutions and environmental impact."
    }
  ]

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Committed to environmentally responsible farming practices that preserve our planet for future generations."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building strong relationships with farmers and agricultural communities worldwide."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize traditional farming methods."
    },
    {
      icon: "📈",
      title: "Growth",
      description: "Helping farmers achieve sustainable growth and maximize their agricultural potential."
    }
  ]

  return (
    <div className="about-us">
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About FarmManagement
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering farmers with intelligent solutions for sustainable agriculture
          </motion.p>
        </div>
        <div className="hero-overlay"></div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="mission-section"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div className="mission-content" variants={fadeInUp}>
            <h2>Our Mission</h2>
            <p>
              At FarmManagement, we're dedicated to transforming agriculture through innovative 
              technology and sustainable practices. Our platform connects farmers with the tools, 
              knowledge, and community they need to thrive in an ever-changing agricultural landscape.
            </p>
          </motion.div>
          
          <motion.div className="mission-stats" variants={fadeInUp}>
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Farmers Supported</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Crop Varieties</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Expert Support</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="values-section"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={fadeInUp}>
            Our Values
          </motion.h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="value-card"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="story-section"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="story-content">
            <motion.div className="story-text" variants={fadeInUp}>
              <h2>Our Story</h2>
              <p>
                Founded in 2020 by a team of agricultural experts and technology enthusiasts, 
                FarmManagement was born from the vision of making modern farming accessible 
                to everyone. We recognized the challenges farmers face in today's complex 
                agricultural environment and set out to create a comprehensive solution.
              </p>
              <p>
                From humble beginnings as a small startup, we've grown into a trusted platform 
                serving thousands of farmers worldwide. Our journey has been guided by the 
                feedback and needs of the farming community, ensuring that every feature we 
                develop serves a real purpose in the field.
              </p>
            </motion.div>
            <motion.div className="story-image" variants={fadeInUp}>
              <img 
                src="/api/placeholder/600/400" 
                alt="Farm landscape" 
                className="story-img"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="team-section"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={fadeInUp}>
            Meet Our Team
          </motion.h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="team-card"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-position">{member.position}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Farm?</h2>
            <p>Join thousands of farmers who trust FarmManagement for their agricultural success.</p>
            <motion.button 
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default AboutUs