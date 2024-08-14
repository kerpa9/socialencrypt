const {
  create,
  getAll,
  update,
  getOne,
  remove,
  login,
  logged,
  // setPosts,
} = require("../controllers/user.controlles");
const express = require("express");
const { verifyJwt } = require("../utils/verifyJWT");

const routerUser = express.Router();

routerUser.route("/").post(create).get(verifyJwt, getAll);
routerUser.route("/login").post(login);

routerUser.route("/me").get(verifyJwt, logged);
routerUser
  .route("/:id")
  .put(verifyJwt, update)
  .get(verifyJwt, getOne)
  .delete(verifyJwt, remove);

// /users/:id/post
// routerUser.route("/:id/posts").post(verifyJwt, setPosts);

module.exports = routerUser;
