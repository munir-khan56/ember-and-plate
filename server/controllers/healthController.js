import mongoose from "mongoose"
import connectDB, { sanitizeMongoUri } from "../config/db.js"

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

  const rawUri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    process.env.MONGO_URL ||
    process.env.DATABASE_URL ||
    ""
  const hasMongoUri = Boolean(process.env.MONGO_URI)
  const hasMongodbUri = Boolean(process.env.MONGODB_URI)
  const sanitized = sanitizeMongoUri(rawUri)

  // Detect URI scheme
  let detectedScheme
  const schemeMatch = rawUri.match(/^[a-zA-Z0-9+.-]+:\/\//)
  if (schemeMatch) {
    detectedScheme = schemeMatch[0]
  } else {
    const embedded = rawUri.match(/[a-zA-Z0-9+.-]+:\/\//)
    if (embedded) {
      detectedScheme = `embedded (${embedded[0]} at index ${embedded.index})`
    } else {
      detectedScheme = rawUri.length > 0 ? "no scheme detected" : "none"
    }
  }

  // Safe 20 characters: mask any credentials after :// or userinfo to guarantee zero credential leak
  let safe20 = rawUri.slice(0, 20)
  const schemeEnd = safe20.indexOf("://")
  if (schemeEnd !== -1) {
    const afterScheme = safe20.slice(schemeEnd + 3)
    if (afterScheme.length > 0) {
      safe20 = safe20.slice(0, schemeEnd + 3) + "***"
    }
  } else {
    const colonOrAt = safe20.search(/[:@]/)
    if (colonOrAt !== -1) {
      safe20 = safe20.slice(0, colonOrAt + 1) + "***"
    }
  }

  // First 10 character codes to identify any invisible Unicode, BOM, or control characters
  const first10CharCodes = []
  for (let i = 0; i < Math.min(10, rawUri.length); i++) {
    first10CharCodes.push(rawUri.charCodeAt(i))
  }

  res.status(200).json({
    status: "ok",
    message: "Ember & Plate API is healthy and running",
    database: dbStatus,
    diagnostics: {
      mongoUriExists: hasMongoUri,
      mongodbUriExists: hasMongodbUri,
      detectedScheme,
      first20Chars: safe20,
      first10CharCodes,
      length: rawUri.length,
      sanitizerChangedValue: rawUri !== sanitized,
      differsFromSanitized: rawUri !== sanitized,
      sanitizedSchemeValid:
        sanitized.startsWith("mongodb://") || sanitized.startsWith("mongodb+srv://"),
    },
    ...(dbError && { error: dbError }),
    timestamp: new Date().toISOString(),
  })
}
