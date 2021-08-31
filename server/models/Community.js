const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const communitiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      minlength: 1,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // TODO: Conditionally require
    },
    grade: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    scope: {
      type: String,
      required: false,
    },
    // TODO: If time:
    picture: {
      data: Buffer,
      contentType: String,
    },
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
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
communitiesSchema.plugin(mongoosePaginate);

const Community = mongoose.model("Community", communitiesSchema);
module.exports = Community;
