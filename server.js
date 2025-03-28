const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const chatRoute = require("./routes/chatex");
const missionRoute = require("./routes/Mission");
const missions = require("./DataSet/missions.json");
const youtube = require("./DataSet/youtube.json");
const objects = require("./DataSet/objects.json");
const quizzes = require("./DataSet/quizzes.json");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
    cors: { 
        origin: "*",
        methods: ["GET", "POST"]
    } 
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/chatex", chatRoute);
app.use("/api/missions", missionRoute);

// Socket.IO
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// API Endpoints
app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to VerseEx API",
        version: "1.0.0",
        endpoints: {
            missions: "/api/missions",
            objects: "/api/objects",
            youtube: "/api/youtube",
            quizzes: "/api/quizzes",
            addMission: "/api/missions/add"
        }
    });
});

app.get("/api/missions", (req, res) => res.json(missions));
app.get("/api/youtube", (req, res) => res.json(youtube));
app.get("/api/objects", (req, res) => res.json(objects));
app.get("/api/quizzes", (req, res) => res.json(quizzes));

// Error Handling
app.use((req, res, next) => {
    res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// Server Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api`);
});