import { Router } from "express";
import emailController from "../controllers/emailController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const emailRouter = Router();

//! emailRouter.post("/send-bulk", authMiddleware, emailController.sendBulkEmails);
//! emailRouter.post("/send-individual", authMiddleware, emailController.sendIndividualEmails); // will be used for resending individual failed emails or testing
emailRouter.post("/generate-and-send", authMiddleware, emailController.generateAndSendEmails);

export default emailRouter;


