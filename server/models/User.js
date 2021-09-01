const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");

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
    first_name: {
      type: String,
      required: false,
      trim: true,
      maxlength: 80,
      minlength: 1,
    },
    last_name: {
      type: String,
      required: false,
      trim: true,
      maxlength: 80,
      minlength: 1,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    userName: { type: String, required: false },
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
    communities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Community",
        // required: true,
      },
    ],
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

UserSchema.statics.createPasswordHash = async function (password) {
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
  } catch (err) {
    console.log("[ERROR] User#createPasswordHash: ", err);
    throw new Error(`[ERROR] User#createPasswordHash: ${err}`);
  }
};

// fetch latest versin of the current model object from db
UserSchema.methods.reload = async function () {
  try {
    // return this.model("User").findById(this.id);
    const reloadedUser = await User.findById(this.id);
    console.log("reloadedUser: ", reloadedUser);
    console.log("this: ", this);
    return reloadedUser;
  } catch (err) {
    console.log("[ERROR] User#reload: ", err);
    throw new Error(`[ERROR] User#reload: ${err}`);
  }
};

// activate pagination plugin
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);
module.exports = User;
