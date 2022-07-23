import { createError } from "../common.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

// get video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// add video
export const addVideo = async (req, res, next) => {
  const video = new Video({ userId: req.user.id, ...req.body });
  try {
    const newVideo = await video.save();
    res.status(200).json(newVideo);
  } catch (err) {
    next(err);
  }
};

// update video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (req.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updateVideo);
    } else {
      return next(createError(403, "Sorry, you can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

// delete video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (req.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndDelete(req.params.id);

      res.status(200).json("Deleted video successfully!");
    } else {
      return next(createError(403, "Sorry, you can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

// update video view
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("Video has a new view!");
  } catch (err) {
    next(err);
  }
};

// get trend video
export const getTrendVideo = async (req, res, next) => {
  try {
    const trendVideos = await Video.find().sort({ views: -1 });
    res.status(200).json(trendVideos);
  } catch (err) {
    next(err);
  }
};

// get random video
export const getRandomVideo = async (req, res, next) => {
  try {
    const randomVideos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(randomVideos);
  } catch (err) {
    next(err);
  }
};

// get chanel's video
export const getSubVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    const subChanels = user.subscribedUser;

    const subVideoList = await Promise.all(
      subChanels.map((subUserId) => {
        return Video.find({ userId: subUserId });
      })
    );
    res
      .status(200)
      .json(subVideoList.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

// get video by tag
export const getByTag = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(",");
    const videoByTags = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videoByTags);
  } catch (err) {
    next(err);
  }
};

// get video by search
export const getBySearch = async (req, res, next) => {
  try {
    const query = req.query.q
    const trendVideos = await Video.find({title: {$regex: query, $options: "i"}}).limit(40)
    res.status(200).json(trendVideos);
  } catch (err) {
    next(err);
  }
};
