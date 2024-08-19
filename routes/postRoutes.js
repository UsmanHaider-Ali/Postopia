const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js");
const { uploadPost } = require("../config/multer.js");

router.get("/getAllPosts", postController.getAllPosts);
router.post(
  "/createNewPost",
  uploadPost.single("image"),
  postController.createNewPost
);

router.get("/getPostById/:id", postController.getPostById);

module.exports = router;
