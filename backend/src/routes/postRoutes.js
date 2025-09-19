import express from "express";
import { createPost } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPost, getAllPosts } from "../controllers/postController.js";



const router = express.Router();

// Create post (protected)
router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);


export default router;
