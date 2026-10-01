import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: [true, "Menu item reference is required"],
  },
  name: {
    type: String,
    required: [true, "Item name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Item price is required"],
    min: [0, "Item price cannot be negative"],
  },
  quantity: {
    type: Number,
    required: [true, "Item quantity is required"],
    min: [1, "Quantity must be at least 1"],
    default: 1,
  },
})

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    items: {
      type: [orderItemSchema],
      required: [true, "Order items cannot be empty"],
      validate: [
        (val) => val.length > 0,
        "Order must have at least one item",
      ],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    deliveryAddress: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [300, "Notes cannot exceed 300 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model("Order", orderSchema)

export default Order
