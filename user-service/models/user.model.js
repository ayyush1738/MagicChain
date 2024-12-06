import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: Number, required: true },
    coin: { type: Number, default: 0 }
});

export default mongoose.model("User", userSchema);
