import express from "express"

const router = express.Router()

// Placeholder for order endpoints (to be implemented in Order API phase)
router.get("/status", (req, res) => {
  res.json({
    message: "Order route active (endpoints pending implementation)",
  })
})

export default router
