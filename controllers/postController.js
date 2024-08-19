const post = require("../models/postModel");
const { upload } = require("../config/multer.js");
const mongoose = require("mongoose");
require("dotenv").config();
const apiBaseUrl = process.env.API_BASE_URL;

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await post.find().populate("user", "-password");

    const postsWithImageUrls = posts.map((post) => {
      return {
        ...post._doc,
        image: post.image ? `${apiBaseUrl}/${post.image}` : null,
      };
    });

    res.status(200).json({
      success: true,
      message: "Fetched all posts successfully",
      posts: postsWithImageUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new post
exports.createNewPost = async (req, res) => {
  try {
    const { user, description } = req.body;

    const image = req.file ? req.file.path : "";

    if (!description && !image) {
      return res.status(400).json({
        success: false,
        message: "Image or description is required",
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please enter the user id",
      });
    }

    const newPost = new post({
      user,
      description,
      image,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get post by Id
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Please enter the post id",
      });
    }
    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id",
      });
    }

    const postById = await post.findById(postId).populate("user", "-password");

    if (!postById) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched post by id successfully",
      post: {
        ...postById._doc,
        image: postById.image ? `${apiBaseUrl}/${postById.image}` : null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
