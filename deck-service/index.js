import express from "express";
import dotenv from "dotenv";
import deckRoutes from "./routes/deck.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/deck", deckRoutes);

app.listen(8001, () => console.log("Deck Service is running on port 8001"));
