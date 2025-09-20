import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Mitt Arv Backend Initialized 🚀" });
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Start server after all routes are registered
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
