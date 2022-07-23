import express from "express";
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// get user
router.get("/detail/:id", getUser);

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// subscribe user
router.put("/sub/:id", verifyToken, subscribe);

// unsubscribe user
router.put("/unsub/:id", verifyToken, unsubscribe);

// like video
router.put("/like/:videoId", verifyToken, like);

// dislike video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
