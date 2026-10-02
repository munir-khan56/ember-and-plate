import mongoose from "mongoose"

export const getHealth = (req, res) => {
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  }
  const dbStatus = dbStates[mongoose.connection.readyState] || "unknown"

  res.status(200).json({
    status: "ok",
    message: "Ember & Plate API is healthy and running",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  })
}
