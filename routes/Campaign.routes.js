import { Router } from "express";
import CampaignController from "../controllers/campaignController.js";
import authMiddleware from "../middleware/auth.middleware.js";
const campaignRouter = Router();

campaignRouter.post("/create-campaign", authMiddleware, CampaignController.createCampaign);
campaignRouter.post("/register-user", CampaignController.registerUser);
campaignRouter.post("/login-user", CampaignController.loginUser);
campaignRouter.delete("/delete-campaign/:id", authMiddleware, CampaignController.deleteCampaign);

export default campaignRouter;