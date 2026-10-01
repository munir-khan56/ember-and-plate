import mongoose from "mongoose"
import Reservation from "../models/Reservation.js"

// Email regex pattern for validation
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

// @desc    Create a new reservation (Guest or Authenticated)
// @route   POST /api/reservations
// @access  Public
export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body

    // 1. Validate required fields
    if (!name || !email || !phone || !date || !time || guests === undefined) {
      return res.status(400).json({
        message:
          "Please provide all required fields (name, email, phone, date, time, guests)",
      })
    }

    // 2. Validate name
    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters long",
      })
    }

    // 3. Validate email
    const trimmedEmail = email.trim().toLowerCase()
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      })
    }

    // 4. Validate phone
    if (typeof phone !== "string" || phone.trim().length < 5) {
      return res.status(400).json({
        message: "Please provide a valid phone number",
      })
    }

    // 5. Validate date
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        message: "Please provide a valid reservation date",
      })
    }

    // 6. Validate guests
    const numGuests = Number(guests)
    if (!Number.isInteger(numGuests) || numGuests < 1 || numGuests > 20) {
      return res.status(400).json({
        message: "Number of guests must be an integer between 1 and 20",
      })
    }

    // 7. Associate user if authenticated
    const userId = req.user ? req.user._id : null

    const reservation = await Reservation.create({
      user: userId,
      name: name.trim(),
      email: trimmedEmail,
      phone: phone.trim(),
      date: parsedDate,
      time: time.trim(),
      guests: numGuests,
      specialRequests: specialRequests ? specialRequests.trim() : "",
      status: "pending",
    })

    res.status(201).json(reservation)
  } catch (error) {
    res.status(500).json({
      message: "Server error creating reservation",
      error: error.message,
    })
  }
}

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email")
      .sort({ date: 1, createdAt: -1 })

    res.status(200).json(reservations)
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching reservations",
      error: error.message,
    })
  }
}

// @desc    Get single reservation by ID
// @route   GET /api/reservations/:id
// @access  Private/Admin
export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid reservation ID format",
      })
    }

    const reservation = await Reservation.findById(id).populate(
      "user",
      "name email"
    )

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      })
    }

    res.status(200).json(reservation)
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching reservation",
      error: error.message,
    })
  }
}

// @desc    Update reservation status
// @route   PUT /api/reservations/:id/status
// @access  Private/Admin
export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid reservation ID format",
      })
    }

    const validStatuses = ["pending", "confirmed", "cancelled", "completed"]
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      })
    }

    const reservation = await Reservation.findById(id)

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      })
    }

    reservation.status = status
    const updatedReservation = await reservation.save()

    res.status(200).json(updatedReservation)
  } catch (error) {
    res.status(500).json({
      message: "Server error updating reservation status",
      error: error.message,
    })
  }
}

// @desc    Delete a reservation
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid reservation ID format",
      })
    }

    const reservation = await Reservation.findById(id)

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      })
    }

    await reservation.deleteOne()

    res.status(200).json({
      message: "Reservation deleted successfully",
      id,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error deleting reservation",
      error: error.message,
    })
  }
}
