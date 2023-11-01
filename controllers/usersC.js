const User = require("../models/users");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  const result = await User.find({});
  res.status(202).json(result);
});

userRouter.post("/", async (req, res) => {
  const body = req.body;
  const passwordHash = await bcrypt.hash(body.password, 10);
  const user = new User({
    name: body.user,
    username: body.username,
    passwordHash,
    admin: body.admin,
  });
  const addedUser = await user.save();

  const userForToken = {
    username: addedUser.username,
    id: user._id,
  };

  const Token = jwt.sign(userForToken, process.env.SECRET);

  res.status(202).json({ ...addedUser, Token });
});

module.exports = userRouter;
