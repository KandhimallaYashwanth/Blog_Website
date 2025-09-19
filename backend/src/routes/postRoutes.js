import express from "express";
import { createPost } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create post (protected)
router.post("/", authMiddleware, createPost);

export default router;
