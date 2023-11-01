const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: String,
  date: { type: String },
  img: { type: String },
  user: mongoose.Schema.Types.ObjectId,
});

itemSchema.set("toJSON", {
  transform: (document, ob) => {
    ob.id = ob._id.toString();
    if (ob.user) {
      ob.user = ob.user.toString();
    }
    delete ob._id;
    delete ob.__v;
  },
});

module.exports = mongoose.model("Item", itemSchema);
