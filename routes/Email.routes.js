import { Router } from "express";
import emailController from "../controllers/emailController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const emailRouter = Router();

/**
 * @swagger
 * /api/email/generate-and-send:
 *   post:
 *     summary: Generate and send emails (supports background workers)
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
 *               campaignId:
 *                 type: string
 *               userData:
 *                 type: array
 *                 items:
 *                   type: object
 *               fromEmail:
 *                 type: string
 *               prompt:
 *                 type: string
 *               useBackgroundWorkers:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       200:
 *         description: Campaign processing started or completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 processing:
 *                   type: object
 */
emailRouter.post("/generate-and-send", authMiddleware, emailController.generateAndSendEmails);

/**
 * @swagger
 * /api/email/process-file-campaign:
 *   post:
 *     summary: Process file-based campaign using background workers
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
 *               campaignId:
 *                 type: string
 *               filePath:
 *                 type: string
 *               fromEmail:
 *                 type: string
 *               prompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: File-based campaign processing started
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 processing:
 *                   type: object
 *                 monitoring:
 *                   type: object
 */
emailRouter.post("/process-file-campaign", authMiddleware, emailController.processFileBasedCampaign);

/**
 * @swagger
 * /api/email/job-status/{jobId}:
 *   get:
 *     summary: Check job status
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Email
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job status information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 jobId:
 *                   type: string
 *                 monitoring:
 *                   type: object
 */
emailRouter.get("/job-status/:jobId", authMiddleware, emailController.getJobStatus);

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