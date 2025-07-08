import { Router } from "express";
import CampaignController from "../controllers/campaignController.js";
import authMiddleware from "../middleware/auth.middleware.js";
const campaignRouter = Router();

/**
 * @swagger
 * /api/campaign/create-campaign:
 *   post:
 *     summary: Create a new campaign
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Campaign
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Campaign created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 campaign:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 */
campaignRouter.post("/create-campaign", authMiddleware, CampaignController.createCampaign);

/**
 * @swagger
 * /api/campaign/get-campaign/{id}:
 *   get:
 *     summary: Get a campaign by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Campaign
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaign data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 */
campaignRouter.get("/get-campaign/:id", authMiddleware, CampaignController.getCampaign);

/**
 * @swagger
 * /api/campaign/get-all-campaigns:
 *   get:
 *     summary: Get all campaigns
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Campaign
 *     responses:
 *       200:
 *         description: List of campaigns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
campaignRouter.get("/get-all-campaigns", authMiddleware, CampaignController.getAllCampaigns);

/**
 * @swagger
 * /api/campaign/delete-campaign/{id}:
 *   delete:
 *     summary: Delete a campaign by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Campaign
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campaign deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
campaignRouter.delete("/delete-campaign/:id", authMiddleware, CampaignController.deleteCampaign);

export default campaignRouter;