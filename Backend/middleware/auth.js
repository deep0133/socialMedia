const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    let { token } = req.cookies || req.body;
    if (!token) {
      token = req.body.token;
    }
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Please login first" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: error.message });
  }
};
