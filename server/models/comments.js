const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    // articleId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Article",
    // },
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Author",
    // },
  },
  {
    timestamps: true,
    versioKey: false,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
