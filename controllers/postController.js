const postModel = require("../models/postModel");
const { validationResult } = require("express-validator");

const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new postModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Postni topib bolmadi",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate("user").exec();

    res.json(posts.reverse());
  } catch (error) {
    console.log(error);
    res.json({
      message: "Postlarni topib bolmadi",
    });
  }
};

const getLastTags = async (req, res) => {
  try {
    const posts = await postModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Postlarni topib bolmadi",
    });
  }
};

const getOnePost = (req, res) => {
  const postId = req.params.id;

  postModel
    .findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            message: "Xatolik Bor",
          });
        }

        if (!doc) {
          return res.status(404).json({
            success: false,
            message: "Bu Postni Topib Bolmadi",
          });
        }

        res.json(doc);
      }
    )
    .populate("user");
};

const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const postId = req.params.id;

    const updated = await postModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(","),
      }
    );
    res.json({
      sucess: true,      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Postni update qilib bolmadi",
    });
  }
};

const removePost = (req, res) => {
  postModel.findOneAndDelete(
    {
      _id: req.params.id,
    },

    (err, doc) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          message: "Xatolik Bor",
        });
      }
      if (!doc) {
        return res.status(404).json({
          success: false,
          message: "Bu Postni Topib Bolmadi",
        });
      }

      res.json({
        success: true,
        message: "Post Successfuly Deleted✅",
      });
    }
  );
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  removePost,
  getLastTags,
};
