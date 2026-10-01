import mongoose from "mongoose"
import MenuItem from "../models/MenuItem.js"

// @desc    Get all menu items (with optional category filter)
// @route   GET /api/menu
// @access  Public
export const getMenuItems = async (req, res) => {
  try {
    const { category } = req.query
    const filter = { available: true }

    if (category && category !== "All") {
      filter.category = new RegExp(`^${category.trim()}$`, "i")
    }

    const items = await MenuItem.find(filter).sort({ createdAt: -1 })
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching menu items",
      error: error.message,
    })
  }
}

// @desc    Get single menu item by ID
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid menu item ID format",
      })
    }

    const item = await MenuItem.findById(id)

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found",
      })
    }

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching menu item",
      error: error.message,
    })
  }
}

// @desc    Create a new menu item
// @route   POST /api/menu
// @access  Private/Admin
export const createMenuItem = async (req, res) => {
  try {
    const { name, category, description, price, image, available } = req.body

    // Validation: required fields
    if (!name || !category || !description || price === undefined || !image) {
      return res.status(400).json({
        message:
          "Please provide all required fields (name, category, description, price, image)",
      })
    }

    const numPrice = Number(price)
    if (isNaN(numPrice) || numPrice < 0) {
      return res.status(400).json({
        message: "Price must be a non-negative number",
      })
    }

    // Check duplicate name
    const existing = await MenuItem.findOne({
      name: new RegExp(`^${name.trim()}$`, "i"),
    })
    if (existing) {
      return res.status(400).json({
        message: "A menu item with this name already exists",
      })
    }

    const item = await MenuItem.create({
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      price: numPrice,
      image: image.trim(),
      available: available !== undefined ? Boolean(available) : true,
    })

    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({
      message: "Server error creating menu item",
      error: error.message,
    })
  }
}

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid menu item ID format",
      })
    }

    const item = await MenuItem.findById(id)

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found",
      })
    }

    const { name, category, description, price, image, available } = req.body

    if (price !== undefined) {
      const numPrice = Number(price)
      if (isNaN(numPrice) || numPrice < 0) {
        return res.status(400).json({
          message: "Price must be a non-negative number",
        })
      }
      item.price = numPrice
    }

    if (name) item.name = name.trim()
    if (category) item.category = category.trim()
    if (description) item.description = description.trim()
    if (image) item.image = image.trim()
    if (available !== undefined) item.available = Boolean(available)

    const updatedItem = await item.save()
    res.status(200).json(updatedItem)
  } catch (error) {
    res.status(500).json({
      message: "Server error updating menu item",
      error: error.message,
    })
  }
}

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid menu item ID format",
      })
    }

    const item = await MenuItem.findById(id)

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found",
      })
    }

    await item.deleteOne()

    res.status(200).json({
      message: "Menu item deleted successfully",
      id,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error deleting menu item",
      error: error.message,
    })
  }
}
