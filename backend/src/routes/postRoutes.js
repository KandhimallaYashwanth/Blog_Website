import express from "express";
import { 
  getAllPosts, 
  getPost, 
  createPost, 
  updatePost, 
  deletePost,
  getUserPosts,
  uploadImage,
  likePost,
  addComment
} from "../controllers/postController.js";
import { authenticateToken, optionalAuth } from "../middleware/authMiddleware.js";
import { upload, handleUploadError } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", optionalAuth, getAllPosts);
router.get("/:id", optionalAuth, getPost);

// Protected routes
router.get("/user/:userId", authenticateToken, getUserPosts);
router.post("/", authenticateToken, createPost);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);
router.post("/:id/like", authenticateToken, likePost); // New route for liking a post
router.post("/:id/comment", authenticateToken, addComment); // New route for adding a comment

// Image upload route
router.post("/upload", authenticateToken, upload.single('image'), handleUploadError, uploadImage);

export default router;
