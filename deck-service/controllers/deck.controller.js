export const addDeck = async (req, res) => {
    try {
        const { userId, deck } = req.body;
        // Logic to add deck
        res.status(201).json({ message: "Deck added successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Failed to add deck", error: err.message });
    }
};
