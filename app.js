import express from "express";
import { healthCheck } from "./controllers/healthController.js";
import emailRouter from "./routes/Email.routes.js";
import userRouter from "./routes/User.routes.js";
const app = express();

// Add middleware to parse JSON
app.use(express.json({ limit: "10mb" }));
// Email endpoints

app.use("/api/email/", emailRouter);
app.use("/api/user/", userRouter);
app.get("/api/health", healthCheck);

app.listen(5500, () => {
  console.log("🟢 ECMP API running on: http://localhost:5500");
});
