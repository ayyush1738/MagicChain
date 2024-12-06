import express from "express";
import { addDeck } from "../controllers/deck.controller.js";

const router = express.Router();

router.post("/", addDeck);

export default router;
