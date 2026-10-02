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

  const rawUri = process.env.MONGO_URI
  const hasMongoUri = Boolean(rawUri)
  const uriLength = rawUri ? rawUri.length : 0

  let prefix = "none"
  if (rawUri) {
    const trimmed = rawUri.trim()
    if (trimmed.startsWith("mongodb://")) {
      prefix = "mongodb://"
    } else if (trimmed.startsWith("mongodb+srv://")) {
      prefix = "mongodb+srv://"
    } else if (
      trimmed.startsWith('"') ||
      trimmed.startsWith("'") ||
      trimmed.startsWith('\\"') ||
      trimmed.startsWith("\\'")
    ) {
      prefix = "starts with quote"
    } else if (rawUri.startsWith(" ") || rawUri.startsWith("\t")) {
      prefix = "starts with whitespace"
    } else if (trimmed.startsWith("MONGO_URI=")) {
      prefix = "starts with MONGO_URI="
    } else if (trimmed.includes("mongodb+srv://") || trimmed.includes("mongodb://")) {
      prefix = "contains valid scheme with prefix/wrapper"
    } else {
      prefix = "invalid"
    }
  }

  res.status(200).json({
    status: "ok",
    message: "Ember & Plate API is healthy and running",
    database: dbStatus,
    diagnostics: {
      mongoUriExists: hasMongoUri,
      mongoUriPrefix: prefix,
      mongoUriLength: uriLength,
    },
    ...(dbError && { error: dbError }),
    timestamp: new Date().toISOString(),
  })
}
