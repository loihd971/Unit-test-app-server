import { createError } from "../common.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

// get user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// add user
export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "Sorry, you can update only your account!"));
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted user successfully!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "Sorry, you can delete only your account!"));
  }
};

// subscribe user
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscribed successfully!");
  } catch (err) {
    next(err);
  }
};

// unsubscribe user
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscribed successfully!");
  } catch (err) {
    next(err);
  }
};

// like video
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {
        likes: id,
      },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked!");
  } catch (err) {
    next(err);
  }
};

// dislike video
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {
        dislikes: id,
      },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked!");
  } catch (err) {
    next(err);
  }
};
