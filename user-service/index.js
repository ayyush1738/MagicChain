import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("User Service: Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/user", userRoutes);

app.listen(8000, () => console.log("User Service is running on port 8000"));
