import express from "express";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/:videoId", getComment);
router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;
