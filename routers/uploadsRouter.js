const Router = require("express");
const express = require("express");
const authWare = require("../utils/authWare");
const uploadsRouter = Router();
const multer = require("multer");

uploadsRouter.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "uploads");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });
uploadsRouter.post("/upload", authWare, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

module.exports = uploadsRouter;
