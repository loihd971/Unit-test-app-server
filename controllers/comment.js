import { createError } from "../common.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// get comments
export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

// add comments
export const addComment = async (req, res, next) => {
  const comment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const newComment = await comment.save();
    res.status(200).json(newComment);
  } catch (err) {
    next(err);
  }
};

// delete comments
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const relateVideo = await Video.findById(req.params.id);

    if (req.user.id === comment.userId || req.user.id === relateVideo.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted comment successfully!");
    } else {
      return next(
        createError(403, "Sorry, you can only delete only your comment!")
      );
    }
  } catch (err) {
    next(err);
  }
};
