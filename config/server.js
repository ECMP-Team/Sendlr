import express from "express";
import arcjetMiddleware from "../middleware/arcjet.middleware.js";
import emailRouter from "../routes/Email.routes.js";
import userRouter from "../routes/User.routes.js";
import campaignRouter from "../routes/Campaign.routes.js";
import { healthCheck } from "../controllers/healthController.js";
import { errorHandler } from "../middleware/errorMiddleware.js";
/* import expressOasGenerator from "expressOasGenerator";
 */ import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";
import docsRouter from "../routes/ReDoc.routes.js";

const server = (app) => {
  // setup and security middlewares
  app.use(express.json({ limit: "10mb" }));
  app.use(arcjetMiddleware);

  // Initialize expressOasGenerator for OpenAPI documentation
  /*  expressOasGenerator.init(app, {}); */
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //? API routes
  app.use("/api/email/", emailRouter);
  app.use("/api/user/", userRouter);
  app.use("/api/campaign/", campaignRouter);
  app.get("/api/health", healthCheck);
  //* ReDoc documentation route
  app.use("/", docsRouter);
  app.use("/", docsRouter);

  // Handle 404 for API routes
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.originalUrl}`,
    });
  });

  // Global error handler
  app.use(errorHandler);
};

export default server;
