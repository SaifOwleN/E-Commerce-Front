const Item = require("../models/items");
const itemsRouter = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

itemsRouter.get("/", async (req, res) => {
  const fetch = await Item.find({});
  res.status(202).json(fetch);
});

itemsRouter.post("/", async (req, res) => {
  const { body } = req;

  const { user } = req;

  const item = new Item({
    name: body.name,
    desc: body.desc,
    date: body.date,
    img: body.img,
    user: user.id,
  });

  const addedItem = await item.save();

  res.status(202).json(addedItem);
});

module.exports = itemsRouter;
