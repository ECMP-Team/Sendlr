import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Campaign API",
      version: "1.0.0",
      description: "API documentation for Campaign routes",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, '../routes/**/*.js')], // fixed for ES modules
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
// This file sets up Swagger documentation for the API using swagger-jsdoc.
// It defines the OpenAPI specification, including security schemes and API metadata.