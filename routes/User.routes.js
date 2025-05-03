import { Router } from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.middleware.js";
const userRouter = Router();


// Authentication routes (now using Arcjet for rate limiting)
userRouter.post("/register-user", UserController.registerUser);
userRouter.post("/login-user", UserController.loginUser);
userRouter.post("/refresh-token", UserController.refreshToken);
userRouter.post("/logout-user", authMiddleware, UserController.logoutUser);

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
