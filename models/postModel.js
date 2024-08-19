const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter the user id"],
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-password",
  });
  next();
});

const post = mongoose.model("Post", postSchema);

module.exports = post;
