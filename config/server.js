import express from "express";
import arcjetMiddleware from "../middleware/arcjet.middleware.js";
import emailRouter from "../routes/Email.routes.js";
import userRouter from "../routes/User.routes.js";
import campaignRouter from "../routes/Campaign.routes.js";
import { healthCheck } from "../controllers/healthController.js";

const server = (app) => {
    app.use(express.json({ limit: "10mb" }));
    app.use(arcjetMiddleware);
    app.use("/api/email/", emailRouter);
    app.use("/api/user/", userRouter);
    app.use("/api/campaign/", campaignRouter);
    app.get("/api/health", healthCheck);
}

export default server;