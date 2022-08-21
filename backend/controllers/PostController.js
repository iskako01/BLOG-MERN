import PostModel from "../models/Post.js";

export const createPost = async (res, req) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageIrl: req.body.imageIrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.send(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create an article.",
    });
  }
};
