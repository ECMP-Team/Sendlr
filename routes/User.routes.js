import { Router } from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.middleware.js";
const userRouter = Router();

userRouter.get("/get-all-campaigns", authMiddleware, UserController.getAllCampaigns); // only allow user to get their own campaigns
userRouter.get("/get-campaigns/:id", authMiddleware, UserController.getCampaign); // only allow user to get their own campaigns
userRouter.get("/get-user/", authMiddleware, UserController.getUser); // self user
userRouter.put("/update-user", authMiddleware, UserController.updateUser); // self user
//! userRouter.get("/get-all-users/", authMiddleware, UserController.getAllUsers);
//! userRouter.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);

export default userRouter;