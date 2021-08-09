const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      minlength: 1,
    },
    author: {
      type: String,
      required: true,
      // TODO: If bored:
      // type: Schema.Types.ObjectId,
      // ref: "Author",
    },
    genre: {
      type: String,
      trim: true,
      required: false,
    },
    isRead: {
      type: Boolean,
      default: false,
      required: false,
    },
    // TODO: If time:
    cover: {
      data: Buffer,
      contentType: String,
    },
    isbn: {
      type: String,
      required: false,
    },
    description: {
      type: String,
    },
    published_date: {
      type: Date,
    },
    publisher: {
      type: String,
    },
  },
  {
    timestamps: true,
    versioKey: false,
    //TODO: test this
    strict: true, // only whitelisted (i.e. schema-defined) attrbutes are saved in the db - but: Aeht: Does NOT apply for query params! )
    strictQuery: true, // ensutes teh abiove for query-params too
  }
);

// activate pagination plugin
booksSchema.plugin(mongoosePaginate);

const Book = mongoose.model("Book", booksSchema);
module.exports = Book;
