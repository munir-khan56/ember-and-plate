import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Reservation date is required"],
    },
    time: {
      type: String,
      required: [true, "Reservation time is required"],
      trim: true,
    },
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest is required"],
      max: [20, "For parties larger than 20, please contact us directly"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [300, "Special requests cannot exceed 300 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Reservation = mongoose.model("Reservation", reservationSchema)

export default Reservation
