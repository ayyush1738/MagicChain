export const addCard = async (req, res) => {
    try {
        const { userId, card } = req.body;
        // Logic to add card
        res.status(201).json({ message: "Card added successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Failed to add card", error: err.message });
    }
};
