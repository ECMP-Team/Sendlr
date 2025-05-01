import { Router } from "express";
import UserController from "../controllers/userController.js";
const userRouter = Router();

userRouter.get("/get-all-campaigns", authMiddleware, UserController.getAllCampaigns);
userRouter.get("/get-campaigns/:id", authMiddleware, UserController.getCampaign);
userRouter.get("/get-user/:id", authMiddleware, UserController.getUser);
//! userRouter.get("/get-all-users/", authMiddleware, UserController.getAllUsers);

userRouter.post("/create-campaign", authMiddleware, UserController.createCampaign);
userRouter.post("/register-user", UserController.registerUser);
userRouter.post("/login-user", UserController.loginUser);

userRouter.delete("/delete-campaign/:id", authMiddleware, UserController.deleteCampaign);
//! userRouter.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);

export default userRouter;