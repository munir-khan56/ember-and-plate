import express from "express"
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
} from "../controllers/reservationController.js"
import { protect, admin, optionalProtect } from "../middleware/authMiddleware.js"

const router = express.Router()

// Public endpoint for guest or authenticated reservation creation
router.post("/", optionalProtect, createReservation)

// Admin-only endpoints for reservation management
router.get("/", protect, admin, getReservations)
router.get("/:id", protect, admin, getReservationById)
router.put("/:id/status", protect, admin, updateReservationStatus)
router.delete("/:id", protect, admin, deleteReservation)

export default router
