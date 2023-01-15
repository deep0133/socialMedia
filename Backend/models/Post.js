const mongoose = require("mongoose");
const User = require("../models/User");
const { Schema } = mongoose;

const userSchema = new Schema({
  caption: {
    type: String,
  },
  image: {
    url: String,
    public_id: { type: String },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `user`,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `user`,
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: `user` },
      comment: { type: String, require: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", userSchema);
module.exports = Post;
