const crops = [
  {
    id: 1,
    slug: "wheat",
    name: "Wheat",
    scientificName: "Triticum aestivum",
    season: "Winter",
    duration: "4-5 months",
    category: "grain",
    description: "A staple grain crop with high nutritional value and versatile uses in food production.",
    fullDescription: `Wheat is one of the world's most important cereal crops, providing about 20% of the total food calories consumed by humans. It is grown on more land area than any other commercial crop and is the most important staple food for humans.

    Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat (T. aestivum).

    Wheat requires a temperate climate with rainfall between 30 and 90 cm (12 and 35 in) and a growing season of 100 to 130 days. Winter wheat is sown in the fall and harvested in the spring or summer; spring wheat is sown in the spring and harvested in late summer or early autumn.`,
    planting:
      "Plant wheat seeds 1-1.5 inches deep in rows 6-8 inches apart. For winter wheat, plant in fall about 6-8 weeks before the first expected frost. For spring wheat, plant as soon as the soil can be worked in spring.",
    care: "Wheat requires moderate watering, especially during the tillering, jointing, and grain-filling stages. Apply nitrogen fertilizer at planting and again at the tillering stage. Control weeds early in the growing season.",
    harvesting:
      "Wheat is ready to harvest when the stalks and heads turn from green to golden yellow and the kernels are hard. Use a combine harvester for large fields or cut by hand for small plots.",
    pests:
      "Common pests include aphids, armyworms, and Hessian flies. Diseases include rust, powdery mildew, and Fusarium head blight.",
    images: ["https://tse4.mm.bing.net/th/id/OIP.leUcEChYZIbEsnNYuhNvmAHaE8?rs=1&pid=ImgDetMain", "/crops/wheat-field.jpg", "/crops/wheat-harvest.jpg"],
  },
  {
    id: 2,
    slug: "rice",
    name: "Rice",
    scientificName: "Oryza sativa",
    season: "Monsoon",
    duration: "3-4 months",
    category: "grain",
    description: "One of the most consumed food crops worldwide, thriving in wet and humid conditions.",
    fullDescription: `Rice is the seed of the grass species Oryza sativa (Asian rice) or less commonly Oryza glaberrima (African rice). As a cereal grain, it is the most widely consumed staple food for a large part of the world's human population, especially in Asia and Africa.

    Rice is the staple food of more than half of the world's population. It is particularly important in Asia, where it provides 50-80% of the daily calories consumed. Rice cultivation is well-suited to countries and regions with low labor costs and high rainfall, as it is labor-intensive to cultivate and requires ample water.

    Rice can be grown in different environments, depending upon water availability. Rice cultivation has been documented in Asia for over 10,000 years.`,
    planting:
      "Rice is typically grown in flooded fields called paddies. Soak rice seeds for 24 hours, then drain and keep moist for 48 hours until they begin to sprout. Transplant seedlings into flooded fields when they are 4-6 inches tall.",
    care: "Maintain water level at 2-4 inches in the paddy. Apply fertilizer 15-20 days after transplanting and again at the panicle initiation stage. Keep the field free from weeds.",
    harvesting:
      "Rice is ready to harvest when the grains are firm but not hard, and the plants have turned golden yellow. Drain the field 7-10 days before harvesting.",
    pests:
      "Common pests include stem borers, leafhoppers, and rice bugs. Diseases include rice blast, bacterial leaf blight, and sheath blight.",
    images: ["/crops/rice.jpg", "/crops/rice-field.jpg", "/crops/rice-harvest.jpg"],
  },
  {
    id: 3,
    slug: "corn",
    name: "Corn",
    scientificName: "Zea mays",
    season: "Spring-Summer",
    duration: "3-5 months",
    category: "grain",
    description: "A versatile crop used for food, feed, and biofuel with high yield potential.",
    fullDescription: `Corn, also known as maize, is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago. The leafy stalk of the plant produces pollen inflorescences and separate ovuliferous inflorescences called ears that yield kernels or seeds, which are fruits.

    Corn is one of the most versatile crops, used for human consumption, livestock feed, and ethanol production. It is the most widely grown grain crop throughout the Americas, with the United States producing about 40% of the world's harvest.

    Corn requires warm soil for germination and a long, frost-free growing season. It is a heavy feeder, requiring fertile soil rich in nitrogen.`,
    planting:
      "Plant corn seeds 1-2 inches deep in rows 30-36 inches apart, with plants 8-12 inches apart within rows. Soil temperature should be at least 60°F (16°C) for good germination. Plant after the last frost date in spring.",
    care: "Corn requires consistent moisture, especially during tasseling and ear formation. Apply nitrogen fertilizer when plants are knee-high. Control weeds until the corn is established.",
    harvesting:
      "Sweet corn is ready when the kernels are plump and milky when punctured. Field corn is harvested when kernels are dry and hard. Corn for silage is harvested when kernels are at the dough stage.",
    pests:
      "Common pests include corn earworms, European corn borers, and corn rootworms. Diseases include corn smut, southern leaf blight, and gray leaf spot.",
    images: ["/crops/corn.jpg", "/crops/corn-field.jpg", "/crops/corn-harvest.jpg"],
  },
  {
    id: 4,
    slug: "tomato",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    season: "Spring-Summer",
    duration: "3-4 months",
    category: "vegetable",
    description: "A popular vegetable crop rich in vitamins and antioxidants, grown worldwide.",
    fullDescription: `Tomatoes are the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant. They originated in western South America and Central America, and are now grown worldwide with thousands of cultivars.

    Tomatoes are a significant source of umami flavor and are consumed in diverse ways, including raw, as an ingredient in many dishes, sauces, salads, and drinks. While they are botanically classified as a fruit, they are commonly used culinarily as a vegetable ingredient or side dish.

    Tomatoes require warm temperatures and plenty of sunlight to grow well. They are sensitive to frost and prefer well-drained, slightly acidic soil.`,
    planting:
      "Start tomato seeds indoors 6-8 weeks before the last frost date. Transplant seedlings outdoors when soil has warmed and all danger of frost has passed. Plant deeply, burying two-thirds of the stem to encourage root development.",
    care: "Provide consistent moisture and mulch to retain soil moisture. Stake or cage plants for support. Prune suckers for indeterminate varieties to improve air circulation and fruit production.",
    harvesting:
      "Harvest tomatoes when they are firm and fully colored. They should pull easily from the vine when ripe. For best flavor, store at room temperature, not in the refrigerator.",
    pests:
      "Common pests include tomato hornworms, aphids, and whiteflies. Diseases include early blight, late blight, and bacterial spot.",
    images: ["/crops/tomato.jpg", "/crops/tomato-plant.jpg", "/crops/tomato-harvest.jpg"],
  },
  {
    id: 5,
    slug: "potato",
    name: "Potato",
    scientificName: "Solanum tuberosum",
    season: "Spring",
    duration: "3-4 months",
    category: "vegetable",
    description: "A starchy tuber crop that is a staple food in many countries and has diverse culinary uses.",
    fullDescription: `The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. The plant is a perennial in the nightshade family Solanaceae.

    Potatoes are the world's fourth-largest food crop, following maize (corn), wheat, and rice. They are an essential part of the diet in many countries and are prepared and served in a variety of ways.

    Potatoes grow best in cool, well-drained soil with a pH of 5.0 to 7.0. They prefer full sun and consistent moisture.`,
    planting:
      "Plant seed potatoes in early spring, about 2-3 weeks before the last frost date. Cut large seed potatoes into pieces with at least 2-3 eyes each. Plant pieces 4-6 inches deep and 12-15 inches apart in rows 2-3 feet apart.",
    care: "Hill soil around plants as they grow to prevent tubers from being exposed to sunlight, which causes greening and makes them toxic. Provide consistent moisture, especially during flowering and tuber formation.",
    harvesting:
      "Harvest new potatoes 2-3 weeks after plants flower. For mature potatoes, wait until vines die back naturally or cut them 2-3 weeks before harvest. Dig carefully to avoid damaging tubers.",
    pests:
      "Common pests include Colorado potato beetles, aphids, and wireworms. Diseases include late blight, early blight, and scab.",
    images: ["/crops/potato.jpg", "/crops/potato-field.jpg", "/crops/potato-harvest.jpg"],
  },
  {
    id: 6,
    slug: "cotton",
    name: "Cotton",
    scientificName: "Gossypium hirsutum",
    season: "Summer",
    duration: "5-6 months",
    category: "fiber",
    description: "A major fiber crop grown for its soft, fluffy staple fiber used in textile production.",
    fullDescription: `Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of the cotton plants of the genus Gossypium in the mallow family Malvaceae. The fiber is almost pure cellulose.

    Cotton is the most widely used natural fiber cloth in clothing. The cultivation of cotton and the knowledge of its spinning and weaving in India dates back to prehistoric times.

    Cotton requires a long frost-free period, plenty of sunshine, and moderate rainfall, usually from 600 to 1200 mm (24 to 47 inches). Soils usually need to be fairly heavy, although the level of nutrients does not need to be exceptional.`,
    planting:
      "Plant cotton seeds after all danger of frost has passed and soil temperatures are at least 60°F (16°C). Plant seeds 1-1.5 inches deep in rows 30-40 inches apart, with plants 6-10 inches apart within rows.",
    care: "Cotton requires regular watering, especially during boll development. Control weeds early in the growing season. Apply nitrogen fertilizer at planting and again at early flowering.",
    harvesting:
      "Cotton is ready to harvest when bolls have opened and the fiber is dry. In commercial production, cotton is harvested mechanically with cotton pickers or strippers.",
    pests:
      "Common pests include boll weevils, bollworms, and aphids. Diseases include bacterial blight, Verticillium wilt, and Fusarium wilt.",
    images: ["/crops/cotton.jpg", "/crops/cotton-field.jpg", "/crops/cotton-harvest.jpg"],
  },
  {
    id: 7,
    slug: "sugarcane",
    name: "Sugarcane",
    scientificName: "Saccharum officinarum",
    season: "Spring",
    duration: "12-18 months",
    category: "cash",
    description: "A perennial grass cultivated for its sweet juice, which is processed into sugar and other products.",
    fullDescription: `Sugarcane is a perennial grass of the genus Saccharum, native to the warm temperate to tropical regions of South, Southeast, and East Asia. It has stout, jointed, fibrous stalks that are rich in sucrose, which accumulates in the stalk internodes.

    Sugarcane is the world's largest crop by production quantity, with Brazil, India, and China as the top producers. It is primarily grown for sugar production, but is also used for ethanol production and as livestock feed.

    Sugarcane requires a tropical or subtropical climate, with a minimum of 600 mm (24 in) of annual moisture. It is one of the most efficient photosynthesizers in the plant kingdom.`,
    planting:
      "Plant sugarcane stem cuttings (setts) horizontally in furrows 4-6 inches deep, with 2-3 buds per sett. Space rows 4-6 feet apart. Plant in spring when temperatures are consistently above 70°F (21°C).",
    care: "Sugarcane requires regular watering, especially during the first 3-4 months of growth. Apply nitrogen fertilizer in split applications. Control weeds until the canopy closes.",
    harvesting:
      "Sugarcane is typically harvested 12-18 months after planting when the stalks are mature and sugar content is highest. Cut stalks at ground level and remove leaves and tops.",
    pests:
      "Common pests include sugarcane borers, aphids, and mealybugs. Diseases include red rot, smut, and ratoon stunting disease.",
    images: ["/crops/sugarcane.jpg", "/crops/sugarcane-field.jpg", "/crops/sugarcane-harvest.jpg"],
  },
  {
    id: 8,
    slug: "soybean",
    name: "Soybean",
    scientificName: "Glycine max",
    season: "Summer",
    duration: "3-5 months",
    category: "legume",
    description: "A legume crop rich in protein and oil, used for food, animal feed, and industrial products.",
    fullDescription: `Soybeans, or soya beans, are a species of legume native to East Asia, widely grown for its edible bean, which has numerous uses. Traditional unfermented food uses of soybeans include soy milk, tofu, and soy sauce.

    Soybeans are an important global crop, providing oil and protein. The United States, Brazil, and Argentina are the world's largest soybean producers, and they provide more than 80% of the world's soybean production.

    Soybeans, like most legumes, perform nitrogen fixation by establishing a symbiotic relationship with the bacterium Bradyrhizobium japonicum.`,
    planting:
      "Plant soybean seeds after all danger of frost has passed and soil temperatures are at least 60°F (16°C). Plant seeds 1-1.5 inches deep in rows 15-30 inches apart, with plants 2-4 inches apart within rows.",
    care: "Soybeans require moderate watering, especially during flowering and pod development. As a legume, soybeans fix their own nitrogen, but may benefit from starter fertilizer. Control weeds early in the growing season.",
    harvesting:
      "Soybeans are ready to harvest when leaves have fallen, pods are dry and brown, and seeds rattle in the pods. In commercial production, soybeans are harvested mechanically with combines.",
    pests:
      "Common pests include bean leaf beetles, stink bugs, and soybean aphids. Diseases include soybean rust, sudden death syndrome, and Phytophthora root rot.",
    images: ["/crops/soybean.jpg", "/crops/soybean-field.jpg", "/crops/soybean-harvest.jpg"],
  },
  {
    id: 9,
    slug: "apple",
    name: "Apple",
    scientificName: "Malus domestica",
    season: "Perennial",
    duration: "Perennial",
    category: "fruit",
    description: "A popular fruit tree known for its sweet, edible fruits and adaptability to various climates.",
    fullDescription: `The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus.

    Apples have been grown for thousands of years in Asia and Europe and were brought to North America by European colonists. Apples have religious and mythological significance in many cultures.

    Apple trees are typically 4–12 m (13–39 ft) tall at maturity, with a dense, twiggy crown. The leaves are alternately arranged dark green-colored simple ovals.`,
    planting:
      "Plant bare-root apple trees in early spring or container-grown trees in spring or fall. Choose a site with full sun and well-drained soil. Dig a hole twice as wide as the root ball and at the same depth. Most apple varieties require a second variety nearby for cross-pollination.",
    care: "Water young trees regularly for the first two years. Apply a balanced fertilizer in early spring. Prune annually in late winter to maintain shape and encourage fruit production. Thin fruit to improve size and quality.",
    harvesting:
      "Apples are ready to harvest when they reach full color and the seeds inside have turned brown. Lift and twist gently to remove from the branch. Different varieties mature at different times from late summer through fall.",
    pests:
      "Common pests include apple maggots, codling moths, and aphids. Diseases include apple scab, fire blight, and powdery mildew.",
    images: ["/crops/apple.jpg", "/crops/apple-orchard.jpg", "/crops/apple-harvest.jpg"],
  },
]

export default crops
