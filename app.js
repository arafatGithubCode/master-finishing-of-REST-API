const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create register Schema and model
const userSchema = new mongoose.Schema({
  name: String,
  images: [String], // Array to store multiple images
  videos: [String], // Array to store multiple videos
});

const User = mongoose.model("users", userSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

//for one file field

// app.post("/register", upload.array("images", 5), async (req, res) => {
//   try {
//     const newUser = new User({
//       name: req.body.name,
//       images: req.files.map(file => file.filename),
//       videos: req.files.map(file => file.filename),
//     });

app.post(
  "/register",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name,
        images: req.files["images"].map((file) => file.filename),
        videos: req.files["videos"].map((file) => file.filename),
      });
      await newUser.save();
      res.status(200).send(newUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Route not found error
app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    message: "Resource not found",
  });
});

// Server error
app.use((err, req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    message: "Something broke",
  });
});

module.exports = app;
