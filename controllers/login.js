const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/users");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const theUser = await User.findOne({ username });
  const passCorrect = theUser
    ? await bcrypt.compare(password, theUser.passwordHash)
    : false;
  if (!(theUser && passCorrect)) {
    return res.status(404).json("username or password is incorrect");
  }

  const userForToken = {
    username,
    id: theUser._id,
  };

  const Token = jwt.sign(userForToken, process.env.SECRET);

  res.status(202).json({ Token, username });
});

module.exports = loginRouter;
