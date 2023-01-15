const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const router = Router();
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

// Get all posts
router.post("/allPost", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.find({ owner: req.user._id }).populate(
      "owner likes comments.user"
    );
    return res.status(200).json({ success: true, post: post.reverse() });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new post
router.post("/createPost", isAuthenticated, async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    let newPost = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    // post created and save in db:
    const post = await Post.create(newPost);
    // adding post id in user Schema ...
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    return res.json({ success: true, message: "Post Uploaded" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
});

// like and unlike  the  post
router.post("/likeAndUnlikePost/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // like or unlike:
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);

      await post.save();
      return res.status(200).json({ success: true, message: "Post Unlike" });
    } else {
      post.likes.push(req.user._id);
      await post.save();

      return res.status(200).json({ success: true, message: "Post Like" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Update post By ID
router.put("/updateCaption/:id", isAuthenticated, async (req, res) => {
  try {
    const { caption } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "UnAuthorized" });
    }
    post.caption = caption;

    await post.save();

    res.status(200).json({ success: true, message: "Caption Updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete post By ID
router.post("/deletePost/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.owner.toString() != req.user._id) {
      return res.status(401).json({ success: false, message: "UnAuthorized" });
    }

    // delete from cloudnary: first:
    cloudinary.v2.uploader
      .destroy(post.image.public_id)
      .then(async (result) => {
        // now delete from db:
        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
        await user.save();

        await post.remove();

        return res.status(200).json({
          success: true,
          message: "Post Deleted",
          cloudinary_result: result,
        });
      })
      .catch((error) => {
        return res.status(500).send({
          message: "Failure",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.put("/addComment/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    let commentIndex = -1;

    // Comment exist or not?
    post.comments.forEach((ele, index) => {
      if (ele.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
      await post.save();
      return res
        .status(200)
        .json({ success: true, message: "Comment Updated" });
    } else {
      post.comments.push({ user: req.user._id, comment: req.body.comment });
      await post.save();
      return res.status(200).json({ success: true, message: "Comment Added" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/deleteComment/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // logged user is owner of the post  and delete any comment of the post:
    if (post.owner.toString() === req.user._id.toString()) {
      if (!req.body.commentId) {
        return res
          .status(404)
          .json({ success: false, message: "Comment Id Required" });
      }
      post.comments.forEach((ele, index) => {
        if (ele._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res
        .status(200)
        .json({ success: true, message: "Selected comment has deleted" });
    } else {
      let deletedIndex = -1;
      post.comments.forEach((ele, index) => {
        if (ele.user.toString() === req.user._id.toString()) {
          deletedIndex = index;
          return post.comments.splice(index, 1);
        }
      });

      if (deletedIndex !== -1) {
        await post.save();
        return res
          .status(200)
          .json({ success: true, message: "Your comment has deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Please first add comment" });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
