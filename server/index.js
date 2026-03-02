import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1);
}


const app = express();
app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', status: 'ok' });
});

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler for debugging
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.path });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start server
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    console.log("Starting server without database connection...");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} (without DB)`)
    );
  });

const cors = require("cors");

app.use(cors({
  origin: "*"
}));