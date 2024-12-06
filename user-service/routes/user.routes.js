import express from "express";
import { getUser, createUser, updateCoins } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/:email", getUser);
router.post("/", createUser);
router.put("/coins", updateCoins);

export default router;
