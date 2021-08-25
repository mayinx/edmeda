const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    name: String,

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      minlength: 1,
    },
    creator: {
      type: String,
      // required: true,
      // TODO:
      // type: Schema.Types.ObjectId,
      // ref: "User",
    },
    type: {
      type: String,
      required: false,
    },

    group: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  },
  {
    timestamps: true,
    versioKey: false,
    //TODO: test this
    strict: true, // only whitelisted (i.e. schema-defined) attrbutes are saved in the db - but: Aeht: Does NOT apply for query params! )
    strictQuery: true, // ensutes the abiove for query-params too
  }
);

// activate pagination plugin
messageSchema.plugin(mongoosePaginate);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
