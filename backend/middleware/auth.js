const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    // Check for token in Authorization header
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7)

      // Verify token (in a real app)
      // const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // req.user = decoded

      // For now, just check if email is provided in the body
      const { email } = req.body

      if (email) {
        const user = await User.findOne({ email })
        if (user) {
          req.user = user
          return next()
        }
      }

      // If we have a userId in query params, use that
      if (req.query.userId) {
        const user = await User.findById(req.query.userId)
        if (user) {
          req.user = user
          return next()
        }
      }

      // If we have a userId in params, use that
      if (req.params.userId) {
        const user = await User.findById(req.params.userId)
        if (user) {
          req.user = user
          return next()
        }
      }
    }

    // If we reach here, check if email is provided in the body
    const { email } = req.body

    if (email) {
      const user = await User.findOne({ email })
      if (user) {
        req.user = user
        return next()
      }
    }

    return res.status(401).json({ message: "Authentication required" })
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Middleware to check if user is an admin
const admin = async (req, res, next) => {
  try {
    // First run the auth middleware
    auth(req, res, () => {
      // Check if user is admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Admin access required" })
      }
      next()
    })
  } catch (error) {
    console.error("Admin middleware error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { auth, admin }
