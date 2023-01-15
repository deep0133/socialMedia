const User = require("../models/User");
const Post = require("../models/Post");
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const sendEmail = require("../middleware/sendMail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

router.post("/me", isAuthenticated, async (req, res) => {
  try {
    let user = await User.findById(req.user._id).populate(
      "posts followers following"
    );
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "your email not exits:",
    });
  }
});

router.post("/otherUser/:id", isAuthenticated, async (req, res) => {
  try {
    let user = await User.findById(req.params.id).populate(
      "followers following"
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Exit" });
    }

    let posts = await Post.find({ owner: user._id }).populate(
      "likes comments.user"
    );

    user = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      posts: posts,
      followers: user.followers,
      following: user.following,
      createdAt: user.createdAt,
    };

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "your email not exits:",
    });
  }
});

router.post("/getAllUser", isAuthenticated, async (req, res) => {
  try {
    let user = await User.find({
      name: { $regex: req.query.name, $options: `i` },
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, image, password } = req.body;

    // check user with this email exist or not:
    let user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "users",
    });

    // create new user now and save it in data base:
    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generateToken();

    // cookie set with expire date : this cookie expire after 90 days : formula :: days(eg:4)*hours(24)*minutes(60)*second(60)*milliSecond(1000)
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check : user exit with this email or not.  => by  findOne function:
    let user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "your email does not exits:",
      });
    }

    // check password:
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    // cookie set with expire date : this cookie expire after 90 days : formula :: days(eg:4)*hours(24)*minutes(60)*second(60)*milliSecond(1000)
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
});

router.post("/logout", isAuthenticated, (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/follow/:id", isAuthenticated, async (req, res) => {
  try {
    let loggedUser = await User.findById(req.user._id);
    let userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (req.params.id.toString() == req.user._id.toString()) {
      return res
        .status(303)
        .json({ success: false, message: "You can't follow to self" });
    }

    // Follow or unFollow:
    if (loggedUser.following.includes(req.params.id)) {
      // data changing of logged user:   UN FOLLOW
      const index = loggedUser.following.indexOf(req.params.id);
      loggedUser.following.splice(index, 1);
      await loggedUser.save();

      // data changing of follow to user:
      const index2 = userToFollow.followers.indexOf(req.user._id);
      userToFollow.followers.splice(index2, 1);
      await userToFollow.save();

      return res
        .status(200)
        .json({ success: true, message: "UnFollow to user" });
    } else {
      loggedUser.following.push(req.params.id);
      userToFollow.followers.push(req.user._id);

      await loggedUser.save();
      await userToFollow.save();

      return res.status(200).json({ success: true, message: "Follow to user" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.post("/postOfFollowing", isAuthenticated, async (req, res) => {
  try {
    // let user = await User.findById(req.user._id).populate("following",'posts');
    let user = await User.findById(req.user._id);
    let posts = await Post.find({ owner: { $in: user.following } }).populate(
      "owner likes comments.user"
    );

    return res.status(200).json({ success: true, posts: posts.reverse() });
  } catch (error) {
    return res.status(500).json({
      success: false,
      n: error.message,
    });
  }
});

router.put("/updatePassword", isAuthenticated, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Provide Old And New Password",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res
        .status(200)
        .json({ success: false, message: "Incorrect Old Password" });
    }
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/updateProfile", isAuthenticated, async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/deleteMyProfile/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // removing avatar from cloudnary:
    if (user.avatar.public_id != "sample_id") {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    const posts = user.posts;
    const followers = user.followers;
    const followings = user.following;
    const userId = user._id;

    await user.remove();

    // logout:
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

    // removing all posts of user:
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      // removing all post from cloudnary:
      if (user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(post.image.public_id);
      }
      await post.remove();
    }

    // removing following from other users:
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = await follower.following.indexOf(userId);
      await follower.following.splice(index, 1);
      await follower.save();
    }

    // removing followers from other users:
    for (let i = 0; i < followings.length; i++) {
      const following = await User.findById(followings[i]);
      const index = await following.followers.indexOf(userId);
      following.followers.splice(index, 1);
      await following.save();
    }

    // removing comments from all posts of user:
    const allPost = await Post.find();
    for (const i = 0; i < allPost.length; i++) {
      const post = await Post.findById(allPost[i]._id);
      for (const j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user == userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }

    // removing likes from all posts of user:
    for (const i = 0; i < allPost.length; i++) {
      const post = await Post.findById(allPost[i]._id);
      for (const j = 0; j < post.likes.length; j++) {
        if (post.likes[j] == userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    return res.status(200).json({ success: true, message: "Profile Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/forgotPassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not exist" });
    }

    const resetPasswordToken = await user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Click on link to reset password :: link<a href=${resetUrl}> RESET PASSWORD </a>`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      return res.status(200).json({
        success: true,
        message: `Link send to ${user.email}`,
        resetUrl,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
});

router.post("/password/reset/:token", async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .toString("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Token Invalid" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Reset",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
