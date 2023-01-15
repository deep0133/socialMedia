const connectDB = require("./config/db")();
const express = require("express");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

// Configuration
app.use(cors());
dotEnv.config({ path: "./config/config.env" });

// Cloudnary SetUp:
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Middleware:
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Routes
app.use(`/api/v1`, require("./routes/user"));
app.use(`/post/v1`, require("./routes/post"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server listening on port : " + port);
});
