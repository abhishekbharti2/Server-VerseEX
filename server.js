const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const chatRoute = require("./routes/chatex");
const missions = require("./DataSet/missions.json");
const youtube = require("./DataSet/youtube.json");
const objects = require("./DataSet/objects.json");
const quizzes = require("./DataSet/quizzes.json");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

connectDB();
app.use("/chatex", chatRoute);

// 🔹 Socket.IO for real-time chat
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data); 
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the VerseEx API Server!",
        available_apis: [
            "/api/missions",
            "/api/objects",
            "/api/youtube",
            "/api/quizzes"
        ]
    });
});

// API Routes
app.get("/api/missions", (req, res) => res.json(missions));
app.get("/api/youtube", (req, res) => res.json(youtube));
app.get("/api/objects", (req, res) => res.json(objects));
app.get("/api/quizzes", (req, res) => res.json(quizzes));

server.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
});
