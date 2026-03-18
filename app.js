import express from "express";
import authRoutes from "./routes/auth.route.js";
import subsbcriberRoutes from "./routes/subscriber.route.js";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", subsbcriberRoutes);

export default app;
