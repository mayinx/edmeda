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
      type: String,
      required: true,
      // TODO:
      // type: Schema.Types.ObjectId,
      // ref: "Author",
    },
    type: {
      type: String,
      required: false,
    },
    grade: {
      type: Number,
      required: false,
    },
    // TODO: If time:
    picture: {
      data: Buffer,
      contentType: String,
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
communitiesSchema.plugin(mongoosePaginate);

const Community = mongoose.model("Community", communitiesSchema);
module.exports = Community;
