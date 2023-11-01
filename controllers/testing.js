const testingRouter = require("express").Router();
const User = require("../models/users");
const Item = require("../models/items");

testingRouter.post("/reset", async (req, res) => {
  await User.deleteMany({});
  await Item.deleteMany({});
  res.status(204).end();
});

module.exports = testingRouter;
