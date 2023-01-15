const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Post = require("./Post");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const crypto = require("crypto");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    require: [true, "Please enter an email"],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Post`,
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `user`,
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `user`,
    },
  ],
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
    minlength: [5, "Password must be at least 5 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .toString("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
