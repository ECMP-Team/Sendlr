import express from "express";
import server from "./config/server.js";
import { PORT } from "./config/config.js";



const app = express();
server(app);

app.listen(PORT, () => {
  console.log(`🟢 ECMP API running on: http://localhost:${PORT}`);
});
