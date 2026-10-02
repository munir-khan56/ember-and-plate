import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"

import healthRoutes from "./routes/healthRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import menuRoutes from "./routes/menuRoutes.js"
import reservationRoutes from "./routes/reservationRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

if (!process.env.VERCEL) {
  dotenv.config()
  if (!process.env.MONGO_URI) {
    dotenv.config({ path: "./server/.env" })
  }
}

const app = express()

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim().replace(/\/$/, ""))
  : ["http://localhost:5173", "http://localhost:5174"]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true)
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        process.env.VERCEL
      ) {
        return callback(null, true)
      }
      return callback(null, true)
    },
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

// Root & Health routes - do NOT block or depend on database connection
app.get("/", (req, res) => {
  res.json({
    message: "Ember & Plate API is running",
  })
})

app.get("/api", (req, res) => {
  res.json({
    message: "Ember & Plate API is running",
  })
})

app.use("/api/health", healthRoutes)
app.use("/health", healthRoutes)

// Ensure database connection is ready for data routes
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    next(error)
  }
})

// API Data Routes (require MongoDB)
app.use("/api/auth", authRoutes)
app.use("/api/menu", menuRoutes)
app.use("/api/reservations", reservationRoutes)
app.use("/api/orders", orderRoutes)

// Error Handling Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

if (!process.env.VERCEL) {
  connectDB().catch((err) => {
    console.error("Initial MongoDB connection error:", err.message)
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app