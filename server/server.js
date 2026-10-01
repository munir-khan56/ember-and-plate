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

dotenv.config()

const app = express()

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim().replace(/\/$/, ""))
  : ["http://localhost:5173", "http://localhost:5174"]

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

connectDB()

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Ember & Plate API is running",
  })
})

// API Routes
app.use("/api/health", healthRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/menu", menuRoutes)
app.use("/api/reservations", reservationRoutes)
app.use("/api/orders", orderRoutes)

// Error Handling Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})