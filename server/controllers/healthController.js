import mongoose from "mongoose"
import connectDB from "../config/db.js"

export const getHealth = async (req, res) => {
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  }

  let dbError = null

  // If not already connected, trigger connection attempt so health check tests database connectivity
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB()
    } catch (error) {
      dbError = error.message
    }
  }

  const dbStatus = dbStates[mongoose.connection.readyState] || "unknown"

  res.status(200).json({
    status: "ok",
    message: "Ember & Plate API is healthy and running",
    database: dbStatus,
    ...(dbError && { error: dbError }),
    timestamp: new Date().toISOString(),
  })
}
