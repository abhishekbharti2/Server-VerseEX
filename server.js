require("dotenv").config();
const express = require("express");
const cors = require("cors");
const missions = require("./DataSet/missions.json");
const youtube = require("./DataSet/youtube.json");
const objects = require("./DataSet/objects.json");
const quizzes = require("./DataSet/quizzes.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to the API!" });
});

app.get("/api/missions", (req, res) => {
    res.json(missions);
});

app.get("/api/youtube", (req, res) => {
    res.json(youtube);
});

app.get("/api/objects", (req, res) => {
    res.json(objects);
});

app.get("/api/quizzes", (req, res) => {
    res.json(quizzes);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
