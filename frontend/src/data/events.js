const events = [
  {
    id: 1,
    slug: "agricultural-expo-2023",
    title: "International Agricultural Expo 2023",
    date: "July 10-15, 2023",
    location: "National Exhibition Center",
    category: "Exhibition",
    image: "/events/event1.jpg",
    summary:
      "The largest agricultural exhibition showcasing the latest farming equipment, technologies, and innovations from around the world.",
    description: `The International Agricultural Expo 2023 is set to be the premier agricultural event of the year, bringing together industry leaders, innovators, farmers, and agricultural professionals from over 50 countries.

    This six-day event will feature:
    
    • Over 500 exhibitors showcasing the latest in agricultural machinery, equipment, and technology
    • Live demonstrations of cutting-edge farming equipment and techniques
    • Daily seminars and workshops covering topics from precision agriculture to sustainable farming practices
    • Networking opportunities with global agricultural leaders and innovators
    • Special pavilions dedicated to organic farming, smart agriculture, and agricultural startups
    
    The expo will be organized into specialized zones including Crop Production, Livestock Management, Irrigation & Water Management, Precision Farming, Organic Agriculture, and Farm Management Software.
    
    Each day will feature keynote presentations from renowned agricultural experts discussing the future of farming and addressing challenges facing the industry.
    
    Admission tickets are available for single days or the full event, with special discounts for agricultural students and farming cooperatives. Early registration is recommended as the event typically reaches capacity.`,
    organizer: "Global Agricultural Association",
    contact: "info@agexpo2023.com",
    website: "www.agexpo2023.com",
    ticketPrice: "$25-$120",
  },
  {
    id: 2,
    slug: "sustainable-farming-workshop",
    title: "Sustainable Farming Workshop",
    date: "July 25, 2023",
    location: "Green Valley Agricultural Center",
    category: "Workshop",
    image: "/events/event2.jpg",
    summary:
      "A hands-on workshop teaching sustainable farming practices, organic pest control, and eco-friendly irrigation methods.",
    description: `Join us for a comprehensive one-day workshop focused on practical sustainable farming techniques that can be implemented on farms of any size. This interactive session will combine classroom learning with hands-on field demonstrations.

    Workshop topics include:
    
    • Principles of sustainable agriculture and regenerative farming
    • Organic pest management strategies that actually work
    • Water conservation techniques and efficient irrigation systems
    • Cover cropping and crop rotation planning
    • Soil health management and natural fertilization methods
    • Reducing chemical inputs while maintaining productivity
    
    Participants will receive a detailed workbook with all techniques covered, sample farm plans, and resource guides for implementing sustainable practices. The workshop will be led by certified organic farmers with over 20 years of experience in sustainable agriculture.
    
    Lunch and refreshments will be provided, featuring locally-grown organic produce. The workshop is limited to 30 participants to ensure personalized attention and meaningful hands-on experience.
    
    Participants should come prepared for outdoor activities with appropriate footwear and clothing.`,
    organizer: "Sustainable Farming Institute",
    contact: "workshops@sustainablefarming.org",
    website: "www.sustainablefarming.org/workshops",
    ticketPrice: "$75",
  },
  {
    id: 3,
    slug: "farm-to-table-festival",
    title: "Farm to Table Festival",
    date: "August 5-7, 2023",
    location: "Riverside Community Park",
    category: "Festival",
    image: "/events/event3.jpg",
    summary:
      "A celebration of local agriculture featuring farm tours, cooking demonstrations, and direct sales from farmers to consumers.",
    description: `The annual Farm to Table Festival returns for its 8th year, celebrating the vital connection between local farmers and consumers. This three-day event showcases the best of regional agriculture and culinary traditions.

    Festival highlights include:
    
    • Farmers' market featuring over 75 local producers selling fresh produce, meats, dairy, and value-added products
    • Guided tours of nearby farms, offering behind-the-scenes looks at diverse farming operations
    • Cooking demonstrations by renowned chefs using seasonal, locally-sourced ingredients
    • Educational workshops on home gardening, food preservation, and sustainable eating
    • Live music from local bands throughout the weekend
    • Children's activities including petting zoo, planting workshops, and agricultural education games
    
    The festival aims to strengthen community connections to local food systems and support regional farmers. Each day features different themed events, with Friday focusing on education, Saturday on culinary experiences, and Sunday on family activities.
    
    Food vendors will offer a variety of meals prepared with ingredients sourced from participating farms. A portion of all proceeds supports agricultural education programs in local schools.`,
    organizer: "Local Food Alliance",
    contact: "info@farmtotablefest.com",
    website: "www.farmtotablefest.com",
    ticketPrice: "$10 per day, $25 weekend pass, children under 12 free",
  },
  {
    id: 4,
    slug: "agricultural-finance-seminar",
    title: "Agricultural Finance Seminar",
    date: "August 15, 2023",
    location: "Central Business Hotel",
    category: "Seminar",
    image: "/events/event4.jpg",
    summary:
      "Learn about financial management, loan options, and investment strategies specifically tailored for agricultural businesses.",
    description: `This comprehensive one-day seminar addresses the unique financial challenges and opportunities facing modern agricultural operations. Designed for farm owners, managers, and agricultural entrepreneurs, the program provides practical knowledge for improving financial outcomes.

    Seminar topics include:
    
    • Agricultural lending programs and how to qualify for favorable terms
    • Tax strategies specifically for farming operations
    • Risk management through insurance and diversification
    • Investment opportunities in agricultural technology and infrastructure
    • Succession planning and intergenerational farm transfers
    • Financial record-keeping systems for farm businesses
    
    Presenters include agricultural banking specialists, farm-focused accountants, financial advisors, and successful farm business owners. Each session includes time for questions and personalized advice.
    
    Participants will receive a comprehensive resource guide with templates for financial planning, contact information for agricultural lenders, and checklists for financial health assessment.
    
    Continental breakfast and lunch are included with registration. Networking opportunities are scheduled throughout the day to connect with financial service providers and fellow agricultural business owners.`,
    organizer: "Agricultural Business Association",
    contact: "seminars@agbusiness.org",
    website: "www.agbusiness.org/finance-seminar",
    ticketPrice: "$150, early bird discount available",
  },
  {
    id: 5,
    slug: "livestock-management-conference",
    title: "Livestock Management Conference",
    date: "September 1-3, 2023",
    location: "Regional Agricultural University",
    category: "Conference",
    image: "/events/event5.jpg",
    summary:
      "A comprehensive conference covering all aspects of livestock management, health, breeding, and market strategies.",
    description: `The Livestock Management Conference brings together industry experts, researchers, and producers for three days of in-depth learning and networking focused on all aspects of animal agriculture.

    Conference tracks include:
    
    • Cattle Management: Beef and dairy production systems, nutrition, and health
    • Small Ruminants: Sheep and goat husbandry, disease prevention, and product marketing
    • Poultry Production: Layer and broiler management, housing systems, and biosecurity
    • Swine Management: Modern production techniques, welfare considerations, and health protocols
    • Emerging Species: Bison, elk, and specialty livestock opportunities
    
    Each day begins with plenary sessions featuring keynote speakers addressing industry-wide challenges and opportunities, followed by specialized breakout sessions for each livestock category.
    
    The conference includes a trade show with over 100 vendors showcasing the latest in livestock equipment, nutrition products, health technologies, and management software.
    
    Evening networking events provide opportunities to connect with fellow producers and industry representatives. A special panel discussion on the final day will address regulatory changes affecting livestock producers.
    
    Registration includes access to all sessions, digital proceedings, meals, and evening events.`,
    organizer: "National Livestock Producers Association",
    contact: "conference@livestockproducers.org",
    website: "www.livestockconference.org",
    ticketPrice: "$275 full conference, $125 single-day passes",
  },
  {
    id: 6,
    slug: "young-farmers-summit",
    title: "Young Farmers Summit",
    date: "September 20, 2023",
    location: "Innovation Agriculture Center",
    category: "Summit",
    image: "/events/event6.jpg",
    summary:
      "A networking and educational event designed for young and beginning farmers to connect and learn from industry experts.",
    description: `The Young Farmers Summit is specifically designed for new and aspiring agricultural entrepreneurs under 40 years of age. This dynamic one-day event combines inspirational success stories, practical knowledge, and valuable networking opportunities.

    Summit highlights include:
    
    • Keynote addresses from successful young farmers who have built thriving agricultural businesses
    • Panel discussions on accessing land, securing startup capital, and navigating regulatory requirements
    • Workshops on business planning, marketing strategies, and technology adoption
    • Speed mentoring sessions with established farmers and agricultural professionals
    • Information on grants, loans, and programs specifically for beginning farmers
    • Networking lunch and evening reception with potential partners and mentors
    
    The summit focuses on both traditional and innovative agricultural models, including conventional farming, organic production, urban agriculture, and value-added enterprises.
    
    Representatives from agricultural lending institutions, government agencies, and support organizations will be available throughout the day to provide information on resources available to young farmers.
    
    Participants will leave with a comprehensive resource guide, potential mentorship connections, and a supportive network of fellow young farmers.`,
    organizer: "Future Farmers Coalition",
    contact: "summit@futurefarmers.org",
    website: "www.youngfarmerssummit.org",
    ticketPrice: "$50, scholarships available",
  },
]

export default events
