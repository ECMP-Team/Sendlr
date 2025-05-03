import express from "express";
import arcjetMiddleware from "../middleware/arcjet.middleware.js";
import emailRouter from "../routes/Email.routes.js";
import userRouter from "../routes/User.routes.js";
import { healthCheck } from "../controllers/healthController.js";
import { redisClient } from "../utils/redisUtils.js";

const server = (app) => {
  app.use(express.json({ limit: "10mb" }));
  // Re-enabled for better security
  app.use(arcjetMiddleware);

  redisClient.on("connect", () => {
    console.log("🟢 Redis connected");
  });

  redisClient.on("error", (err) => {
    console.error("🔴 Redis error:", err);
  });

  app.use("/api/email/", emailRouter);
  app.use("/api/user/", userRouter);
  app.get("/api/health", healthCheck);

  // Add a test endpoint
  app.get("/api/test", (req, res) => {
    res.json({ message: "API is working" });
  });
};

export default server;