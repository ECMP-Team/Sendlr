import { Router } from "express";
import emailController from "../controllers/emailController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const emailRouter = Router();

/**
 * @swagger
 * /api/email/generate-and-send:
 *   post:
 *     summary: Generate and send emails
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Emails sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 sentCount:
 *                   type: integer
 */
emailRouter.post("/generate-and-send", authMiddleware, emailController.generateAndSendEmails);

/**
 * @swagger
 * /api/email/excel-to-json:
 *   post:
 *     summary: Convert Excel file to JSON
 *     tags:
 *       - Email
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: JSON data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
emailRouter.post("/excel-to-json", emailController.convertToJson);
export default emailRouter;