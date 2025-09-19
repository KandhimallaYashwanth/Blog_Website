import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// protected routes
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
