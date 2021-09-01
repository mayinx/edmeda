const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    name: String,

    content: {
      type: String,
      required: true,
      trim: true,
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

MessageSchema.statics.latest = (count) => {
  return Message.find({}).sort({ _id: "desc" }).limit(count);
};
MessageSchema.statics.roomMessages = (query) => {
  return Message.find(query).sort({ createdAt: -1 });
  // return Message.find(query).sort({ _id: "desc" }).limit(10);

  // return Message.find({ group: "454asd" }).sort({ createdAt: -1 }).limit(10);

  // return new Promise((resolve, reject) => {
  //   Message.find((query, error, docs) => {
  //     if (error) {
  //       console.error(error);
  //       return reject(error);
  //     }
  //     resolve(docs);
  //   });
  // });
};

// activate pagination plugin
MessageSchema.plugin(mongoosePaginate);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
