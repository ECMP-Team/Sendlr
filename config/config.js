import { config } from "dotenv";

config({ path: ".env" });
export const { PORT, ARCJET_ENV, ARCJET_KEY, RESEND_API_KEY, MAX_FILE_SIZE, AI_API, JWT_SECRET, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
