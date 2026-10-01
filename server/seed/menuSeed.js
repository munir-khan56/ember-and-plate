import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import MenuItem from "../models/MenuItem.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure server/.env is loaded regardless of current working directory
dotenv.config({ path: path.resolve(__dirname, "../.env") })

const initialDishes = [
  {
    name: "Ember Grilled Ribeye",
    category: "Mains",
    description:
      "Fire-grilled prime ribeye finished with roasted garlic butter and seasonal herbs.",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85",
    available: true,
  },
  {
    name: "Truffle Mushroom Pasta",
    category: "Pasta",
    description:
      "Silky pasta, wild mushrooms, parmesan, and a delicate touch of black truffle.",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    available: true,
  },
  {
    name: "Ember Signature Burger",
    category: "Mains",
    description:
      "Charred beef, aged cheddar, caramelized onions, and our house ember sauce.",
    price: 17,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85",
    available: true,
  },
  {
    name: "Charred Octopus",
    category: "Starters",
    description:
      "Smoked paprika, lemon, herbs, and roasted garlic.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    available: true,
  },
  {
    name: "Atlantic Salmon",
    category: "Seafood",
    description:
      "Pan-seared salmon, citrus beurre blanc, and fresh herbs.",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85",
    available: true,
  },
  {
    name: "Braised Short Rib",
    category: "Mains",
    description:
      "Slow-braised beef, silky mash, and red wine jus.",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    available: true,
  },
  {
    name: "Dark Chocolate Tart",
    category: "Desserts",
    description:
      "72% dark chocolate, sea salt, and vanilla cream.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85",
    available: true,
  },
]

const seedMenu = async () => {
  try {
    const mongoUri = process.env.MONGO_URI
    if (!mongoUri) {
      console.error("MONGO_URI is not defined in environment.")
      process.exit(1)
    }

    await mongoose.connect(mongoUri)
    console.log("Connected to MongoDB for menu seeding...")

    let upsertedCount = 0
    for (const dish of initialDishes) {
      await MenuItem.findOneAndUpdate(
        { name: dish.name },
        dish,
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
      )
      upsertedCount++
    }

    console.log(`Successfully seeded/updated ${upsertedCount} menu items without duplicates.`)
    await mongoose.connection.close()
    console.log("MongoDB connection closed.")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding menu items:", error.message)
    process.exit(1)
  }
}

seedMenu()
