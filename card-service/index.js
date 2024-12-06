import express from "express";
import dotenv from "dotenv";
import cardRoutes from "./routes/card.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/card", cardRoutes);

app.listen(8002, () => console.log("Card Service is running on port 8002"));
