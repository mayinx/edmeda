const mongoose = require("mongoose");
const { Schema } = mongoose;

const articlesSchema = new Schema(
  {
    title: {
      type: String,
      default: "My default title",
      required: true,
    },
    body: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    comments: [{ body: String, date: Date }],
    votes: {
      up: Number,
      down: Number,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versioKey: false,
  }
);

const Article = mongoose.model("Article", articlesSchema);
module.exports = Article;
