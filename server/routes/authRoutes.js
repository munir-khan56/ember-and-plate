import express from "express"
import {
  register,
  login,
  getCurrentUser,
} from "../controllers/authController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", protect, getCurrentUser)

// Endpoint to verify admin authorization middleware
router.get("/admin-check", protect, admin, (req, res) => {
  res.status(200).json({
    message: "Admin authorization verified successfully",
    user: req.user,
  })
})

export default router
