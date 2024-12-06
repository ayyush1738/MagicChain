import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    decks: { type: Array, default: [] }
});

export default mongoose.model("Deck", deckSchema);
