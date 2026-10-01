import mongoose from "mongoose"

const connectDB = async () => {
  // Reuse existing connection if already connected (1) or connecting (2)
  if (mongoose.connection.readyState >= 1) {
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection failed:", error.message)
    if (!process.env.VERCEL) {
      process.exit(1)
    }
    throw error
  }
}

export default connectDB