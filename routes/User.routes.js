import { Router } from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.middleware.js";
const userRouter = Router();


userRouter.get("/get-user/", authMiddleware, UserController.getUser); // self user
userRouter.put("/update-user", authMiddleware, UserController.updateUser); // self user
userRouter.post("/register-user", UserController.registerUser);
userRouter.post("/login-user", UserController.loginUser);
//! userRouter.get("/get-all-users/", authMiddleware, UserController.getAllUsers);
//! userRouter.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);

export default userRouter;
