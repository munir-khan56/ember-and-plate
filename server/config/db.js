import mongoose from "mongoose"

// Cache connection promise across serverless function invocations
let cachedPromise = null

const sanitizeMongoUri = (uri) => {
  if (!uri || typeof uri !== "string") return ""
  let cleaned = uri.trim()

  const srvIdx = cleaned.indexOf("mongodb+srv://")
  const standardIdx = cleaned.indexOf("mongodb://")

  if (srvIdx !== -1) {
    cleaned = cleaned.slice(srvIdx)
  } else if (standardIdx !== -1) {
    cleaned = cleaned.slice(standardIdx)
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

  const mongoUri = sanitizeMongoUri(process.env.MONGO_URI)

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