import mongoose from "mongoose"

// Cache connection promise across serverless function invocations
let cachedPromise = null

export const sanitizeMongoUri = (uri) => {
  if (!uri || typeof uri !== "string") return ""

  // Strip BOM, zero-width characters, and non-breaking spaces
  let cleaned = uri
    .replace(/[\uFEFF\u00A0\u2060]/g, "")
    .replace(/[\u200B\u200C\u200D]/g, "")
    .trim()

  // Handle URL-encoded scheme if present (e.g. mongodb%2Bsrv%3A%2F%2F or mongodb%3A%2F%2F)
  if (/^mongodb(%2Bsrv)?%3A%2F%2F/i.test(cleaned)) {
    try {
      cleaned = decodeURIComponent(cleaned)
    } catch {
      // ignore
    }
  }

  // Normalize escaped slashes (e.g. mongodb+srv:\/\/ or mongodb+srv:\\/)
  cleaned = cleaned.replace(/\\+\//g, "/").replace(/\\\\+/g, "/")

  // Normalize single slash after scheme colon if only one was provided (e.g. mongodb+srv:/host)
  cleaned = cleaned.replace(/^(?:["'\s]*)(mongodb(?:\+srv)?):(?!\/\/)\/*(?=[^/])/i, "$1://")

  // Find mongodb:// or mongodb+srv:// case-insensitively
  const match = cleaned.match(/mongodb(\+srv)?:\/\//i)
  if (match && match.index !== undefined) {
    const scheme = match[0].toLowerCase()
    cleaned = scheme + cleaned.slice(match.index + match[0].length)
  }

  // Remove any trailing quotes, semicolons, whitespace, or newlines
  cleaned = cleaned.replace(/["';\s\r\n]+$/, "")

  return cleaned
}

const connectDB = async () => {
  // Reuse existing connection if already connected (1)
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  // If already connecting, reuse the in-flight connection promise
  if (cachedPromise) {
    return cachedPromise
  }

  const rawUri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    process.env.MONGO_URL ||
    process.env.DATABASE_URL
  const mongoUri = sanitizeMongoUri(rawUri)

  if (!mongoUri) {
    const error = new Error("MONGO_URI environment variable is not defined")
    console.error(error.message)
    throw error
  }

  const opts = {
    serverSelectionTimeoutMS: 5000,
  }

  cachedPromise = mongoose
    .connect(mongoUri, opts)
    .then((mongooseInstance) => {
      console.log("MongoDB connected successfully")
      return mongooseInstance
    })
    .catch((error) => {
      cachedPromise = null // Reset cache so subsequent calls can retry
      console.error("MongoDB connection failed:", error.message)
      throw error
    })

  return cachedPromise
}

export default connectDB