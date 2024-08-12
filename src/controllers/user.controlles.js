const Post = require("../models/Post");
const User = require("../models/User");
const catchError = require("../utils/catchError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = catchError(async (req, res) => {
  const results = await User.findAll();
  return res.status(201).json(results);
});

const create = catchError(async (req, res) => {
  const { password } = req.body;
  // El diez designa la cantidad de iteraciones que se realizan para encriptar
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashedPassword });

  return res.status(201).json(result);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;

  delete req.body.password;
  delete req.body.email;

  const result = await User.update(req.body, {
    where: { id },
    returning: true,
  });

  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;

  const result = await User.destroy({ where: { id } });

  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const login = catchError(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user)
    return res.status(401).json({ message: "These credentials is not found" });

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "2d",
  });

  return res.status(200).json({ user, token });
});

const logged = catchError(async (req, res) => {
  const user = req.user;

  return res.json(user);
});

const setPosts = catchError(async (req, res) => {
  const { userId } = req.body,
    favorites = await Post.findByPk();
  console.log(userId);
  await favorites.setPosts(req.body);

  const posts = await favorites.getPosts();

  console.log(posts);
  return res.json(posts);
});

module.exports = {
  create,
  getAll,
  update,
  getOne,
  remove,
  login,
  logged,
  setPosts,
};
