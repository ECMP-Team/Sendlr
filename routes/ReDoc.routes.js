import { Router } from "express";
import swaggerSpec from "../config/swagger.js";

const docsRouter = Router();
const specUrl = "/swagger.json";
docsRouter.get(specUrl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

docsRouter.get("/redoc", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Docs</title>
        <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
      </head>
      <body>
        <redoc spec-url="/swagger.json"></redoc>
      </body>
    </html>
  `);
});

export default docsRouter;
