import express from "express";
import { 
  getAllPosts, 
  getPost, 
  createPost, 
  updatePost, 
  deletePost,
  getUserPosts,
  uploadImage
} from "../controllers/postController.js";
import { authenticateToken, optionalAuth } from "../middleware/authMiddleware.js";
import { upload, handleUploadError } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", optionalAuth, getAllPosts);
router.get("/:id", optionalAuth, getPost);
router.get("/user/:userId", getUserPosts);

// Protected routes
router.post("/", authenticateToken, createPost);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);

// Image upload route
router.post("/upload", authenticateToken, upload.single('image'), handleUploadError, uploadImage);

export default router;
