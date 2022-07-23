import express from "express";
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
  getSubVideo,
  getRandomVideo,
  addView,
  getTrendVideo,
  getByTag,
  getBySearch
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// get video
router.get("/detail/:id", getVideo);

// add video
router.post("/", verifyToken, addVideo);

// delete video
router.delete("/:id", verifyToken, deleteVideo);

// update video
router.put("/:id", verifyToken, updateVideo);

// update video view
router.get("/update-view/:id", addView);

// get trend video
router.get("/trend-videos", getTrendVideo);

// get random video
router.get("/random-videos", getRandomVideo);

// get chanel's video
router.get("/sub-videos", verifyToken,  getSubVideo);

// get video by tags
router.get("/tags", getByTag);

// get video by search
router.get("/search", getBySearch);

export default router;
