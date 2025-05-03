import { Router } from "express";
import UserController from "../controllers/userController.js";
import CampaignController from "../controllers/campaignController.js";
import authMiddleware from "../middleware/auth.middleware.js";
import rateLimiter from "../middleware/rateLimiter.middleware.js";
const userRouter = Router();

// Authentication routes with rate limiting
userRouter.post("/register", rateLimiter('register'), UserController.registerUser);
userRouter.post("/login", rateLimiter('login'), UserController.loginUser);
userRouter.post("/refresh-token", rateLimiter('default'), UserController.refreshToken);
userRouter.post("/logout", authMiddleware, UserController.logoutUser);

// Session management routes
userRouter.get("/sessions", authMiddleware, UserController.getUserSessions);
userRouter.delete("/sessions/:sessionId", authMiddleware, UserController.deleteUserSession);
userRouter.delete("/sessions", authMiddleware, UserController.deleteAllUserSessions);

// User management routes
userRouter.get("/get-user/", authMiddleware, UserController.getUser); // self user
userRouter.put("/update-user", authMiddleware, UserController.updateUser); // self user

// Campaign routes
userRouter.get("/get-all-campaigns", authMiddleware, CampaignController.getAllCampaigns);
userRouter.get("/get-campaigns/:id", authMiddleware, CampaignController.getCampaign);
userRouter.post("/create-campaign", authMiddleware, CampaignController.createCampaign);
userRouter.delete("/delete-campaign/:id", authMiddleware, UserController.deleteCampaign);

// Commented out routes
//! userRouter.get("/get-all-users/", authMiddleware, UserController.getAllUsers);
//! userRouter.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);

export default userRouter;
