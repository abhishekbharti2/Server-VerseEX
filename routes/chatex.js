const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const chatSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: String
});

const Chats = mongoose.model("chatexes", chatSchema);

router.post("/", async (req, res) => {
    try {
        const { username, message, timestamp } = req.body;

        if (!username || !message) {
            return res.status(400).json({ error: "Username and message are required!" });
        }

        const newMSG = new Chats({ username, message, timestamp});
        await newMSG.save();

        res.json(newMSG);
    } catch (error) {
        console.error("Message not saved", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch all messages
router.get("/", async (req, res) => {
    try {
        const allmsg = await Chats.find();
        res.json(allmsg);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

module.exports = router;
