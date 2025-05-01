// Simple health check endpoint
export const healthCheck = (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "ECMP API is running",
  });
}; 