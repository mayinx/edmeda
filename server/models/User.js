const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const USER_TYPES = {
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
};

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      minlength: 1,
    },
    // first_name: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   maxlength: 80,
    //   minlength: 1,
    // },
    // last_name: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   maxlength: 80,
    //   minlength: 1,
    // },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    userName: { type: String, required: true },
    creator: {
      type: String,
      required: false,
      // TODO:
      // type: Schema.Types.ObjectId,
      // ref: "User",
    },
    type: {
      type: String,
      required: false,
    },
    // TODO: If time:
    // avatar: {
    //   data: Buffer,
    //   contentType: String,
    //   required: false,
    // },
    communities: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      // required: true,
    },
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
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
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);
module.exports = User;
