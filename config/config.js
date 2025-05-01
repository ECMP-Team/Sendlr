import { config } from "dotenv";

config({ path: ".env" });
export const { PORT, ARCJET_ENV, ARCJET_KEY, RESEND_API_KEY, MAX_FILE_SIZE, AI_API, JWT_SECRET } = process.env;
