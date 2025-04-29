import { config } from "dotenv";

config({ path: ".env" });
export const { PORT, RESEND_API_KEY, MAX_FILE_SIZE, AI_API } = process.env;
