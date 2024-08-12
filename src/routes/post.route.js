const express = require("express");
const {
  getAll,
  getOne,
  create,
  remove,
  update,
} = require("../controllers/post.controller");
const { verifyJwt } = require("../utils/verifyJWT");
const routerPost = express.Router();

routerPost.route("/").get(getAll).post(verifyJwt, create);

routerPost
  .route("/:id")
  .get(getOne)
  .delete(verifyJwt, remove)
  .put(verifyJwt, update);

// /users/:id/post
// routerUser.route("/:id/posts").post(verifyJwt, setPosts);

module.exports = routerPost;
