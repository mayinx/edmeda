const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const groupsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      minlength: 1,
    },
    creator: {
      type: String,
      required: false,
      // TODO:
      // type: Schema.Types.ObjectId,
      // ref: "Author",
    },
    type: {
      type: String,
      required: false,
    },
    scope: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: false,
    },
    // TODO: If time:
    // picture: {
    //   data: Buffer,
    //   contentType: String,
    //   required: false,
    // },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      // required: true,
    },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
    versioKey: false,
    //TODO: test this
    strict: true, // only whitelisted (i.e. schema-defined) attributes are saved in the db - but: Aeht: Does NOT apply for query params! )
    strictQuery: true, // ensures the above for query-params too
  }
);

// activate pagination plugin
groupsSchema.plugin(mongoosePaginate);

const Group = mongoose.model("Group", groupsSchema);
module.exports = Group;
