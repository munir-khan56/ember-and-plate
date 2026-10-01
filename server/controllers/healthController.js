export const getHealth = (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Ember & Plate API is healthy and running",
    timestamp: new Date().toISOString(),
  })
}
