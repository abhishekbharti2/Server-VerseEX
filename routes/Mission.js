const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const MissionSchema = new mongoose.Schema({
    gmail: { type: String, required: true },
    name: { type: String, required: true },
    agency: { type: String, required: true },
    information: { type: String, default: "" },
    result: { type: String, default: "" },
    image: { type: String, default: "" },
    details: { type: String, default: "" },
    start: { type: Date, required: true },  // Changed to Date type
    end: { type: Date, required: true }    // Changed to Date type
}, { timestamps: true });  // Added timestamps

const Mission = mongoose.model("Mission", MissionSchema);  // Changed model name to singular "Mission"

router.post("/add", async (req, res) => {
    try {
        const { gmail, name, agency, information, result, image, details, start, end } = req.body;

        // Basic validation
        if (!gmail || !name || !agency || !start || !end) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newMission = new Mission({ 
            gmail, 
            name, 
            agency, 
            information: information || "", 
            result: result || "", 
            image: image || "", 
            details: details || "", 
            start: start || "",
            end: end || ""
        });

        await newMission.save();

        res.status(201).json({ 
            message: "Mission added successfully",
            mission: newMission
        });
        
    } catch (error) {
        console.error("Error saving mission:", error);
        res.status(500).json({ 
            error: "Internal server error",
            details: error.message 
        });
    }
});

module.exports = router;