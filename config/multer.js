const multer = require("multer");
const path = require("path");
const fs = require("fs");

const postUploadDir = "uploads/posts";
if (!fs.existsSync(postUploadDir)) {
  fs.mkdirSync(postUploadDir);
}
const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/posts");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// const profileUploadDir = "uploads/profiles";
// if (!fs.existsSync(profileUploadDir)) {
//   fs.mkdirSync(profileUploadDir);
// }
// const profileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/profile");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const chatUploadDir = "uploads/chats";
// if (!fs.existsSync(chatUploadDir)) {
//   fs.mkdirSync(chatUploadDir);
// }
// const chatStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/chats");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const uploadPost = multer({ storage: postStorage });
// const uploadProfile = multer({ storage: profileStorage });
// const uploadChat = multer({ storage: chatStorage });

module.exports = { uploadPost };
