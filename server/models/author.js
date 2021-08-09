const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versioKey: false,
  }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
