const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://farmingFYP:1234@cluster0.nxj4i1j.mongodb.net/farmingFYP")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));
app.use("/api/market-trends", require("./routes/marketTrendRoutes"));
app.use("/api/user-crops", require("./routes/userCropRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
const marketPriceRoutes = require('./routes/marketPriceRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.use('/api/market-prices', marketPriceRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
