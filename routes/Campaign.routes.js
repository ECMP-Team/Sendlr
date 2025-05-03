import { Router } from "express";
import CampaignController from "../controllers/campaignController.js";
import authMiddleware from "../middleware/auth.middleware.js";
const campaignRouter = Router();

campaignRouter.post("/create-campaign", authMiddleware, CampaignController.createCampaign);
campaignRouter.get("/get-campaign/:id", authMiddleware, CampaignController.getCampaign);
campaignRouter.get("/get-all-campaigns", authMiddleware, CampaignController.getAllCampaigns);
campaignRouter.delete("/delete-campaign/:id", authMiddleware, CampaignController.deleteCampaign);

export default campaignRouter;