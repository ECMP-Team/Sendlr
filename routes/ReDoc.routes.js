import { Router } from "express";
import swaggerSpec from "../config/swagger.js";

const docsRouter = Router();
docsRouter.get("/redoc", (req, res) => {
  const specUrl = "/swagger.json"; // Make sure this route exists as shown above
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Docs</title>
        <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
      </head>
      <body>
        <redoc spec-url="${specUrl}"></redoc>
      </body>
    </html>
  `);
});

docsRouter.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default docsRouter;
