import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CropManagement from "./pages/CropManagement"
import CropDetail from "./pages/CropDetail"
import MarketTrends from "./pages/MarketTrends"
import NewsEvents from "./pages/NewsEvents"
import NewsDetail from "./pages/NewsDetail"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Contact from "./pages/Contact"
import Support from "./pages/Support"
import Search from "./pages/Search"
import AboutUs from "./pages/AboutUs"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import IrrigationGuide from "./pages/IrrigationGuide"
import WeatherTips from "./pages/WeatherTips"
import MarketInfo from "./pages/MarketInfo"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/crop-management" element={<CropManagement />} />
              <Route path="/crop/:slug" element={<CropDetail />} />
              <Route path="/market-trends" element={<MarketTrends />} />
              <Route path="/news-events" element={<NewsEvents />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/irrigation-guide" element={<IrrigationGuide />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="/weather-tips" element={<WeatherTips />} />
              <Route path="/market-info" element={<MarketInfo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
