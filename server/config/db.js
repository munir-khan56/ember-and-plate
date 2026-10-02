import mongoose from "mongoose"

// Cache connection promise across serverless function invocations
let cachedPromise = null

const connectDB = async () => {
  // Reuse existing connection if already connected (1)
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  // If already connecting, reuse the in-flight connection promise
  if (cachedPromise) {
    return cachedPromise
  }

  if (!process.env.MONGO_URI) {
    const error = new Error("MONGO_URI environment variable is not defined")
    console.error(error.message)
    throw error
  }

  const opts = {
    serverSelectionTimeoutMS: 5000,
  }

  cachedPromise = mongoose
    .connect(process.env.MONGO_URI, opts)
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