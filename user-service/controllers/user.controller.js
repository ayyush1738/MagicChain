import User from "../models/user.models.js";

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { email, address, quantity } = req.body;
        const user = new User({ email, address, quantity, coin: 0 });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to create user", error: err.message });
    }
};

export const updateCoins = async (req, res) => {
    try {
        const { email, coin } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        user.coin += coin;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to update coins", error: err.message });
    }
};
