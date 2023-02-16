const Router = require("express");
const postRouter = Router();
const {
  createPost,
  getAllPosts,
  getOnePost,
  removePost,
  updatePost,
  getLastTags
} = require("../controllers/postController");
const authWare = require("../utils/authWare");

const { createPostValidation } = require("../validations");

postRouter.get("/posts", getAllPosts);
postRouter.get("/tags", getLastTags);
postRouter.get("/posts/:id", getOnePost);
postRouter.post("/posts",authWare,createPostValidation,createPost);    
postRouter.delete("/posts/:id", authWare, removePost);
postRouter.patch("/posts/:id", authWare, updatePost);                 

module.exports = postRouter;
