import express from "express";
import emailController from "./controllers/emailController.js";
import { healthCheck } from "./controllers/healthController.js";

const app = express();

// Add middleware to parse JSON
app.use(express.json({ limit: "10mb" }));
// Email endpoints
app.post("/api/send-bulk", emailController.sendBulkEmails);
app.post("/api/send-individual", emailController.sendIndividualEmails); // will be used for resending individual failed emails or testing
app.post("/api/generate-and-send", emailController.generateAndSendEmails);


//TODO : Add a route to create a campaign in the database
// This is a placeholder route, you should implement the actual logic in the controller
app.post("/api/createCampaign", () => {
  console.log("Campaign created");
});
// Health check endpoint
app.get("/api/health", healthCheck);

app.listen(5500, () => {
  console.log("🟢 ECMP API running on: http://localhost:5500");
});
