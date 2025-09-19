import express from "express";
import { createPost } from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPost, getAllPosts } from "../controllers/postController.js";
import { getPostById } from "../controllers/postController.js";
import { updatePost } from "../controllers/postController.js";
import { deletePost } from "../controllers/postController.js";









const router = express.Router();

// Create post (protected)
router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);



export default router;
