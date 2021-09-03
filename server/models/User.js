const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
const _ = require("lodash");

const bcryptjs = require("bcryptjs");

const TYPES = {
  TEACHER: "Teacher",
  STUDENT: "Student",
  PARENT: "Parent",
};
const GENDERS = ["male", "female", "diverse"];

//
// TODO: Let's start small here ;-) - extend later
// const DEFAULT_AVATARS = ["fbAvatar1", "fbAvatar2", "fbAvatar3", "fbAvatar4"];
const DEFAULT_AVATARS = ["fbAvatar1"];

const UserSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: {
        values: Object.values(TYPES),
        message: "Invalid user type",
      },
    },
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
    gender: {
      type: String,
      trim: true,
      required: false,

      enum: {
        values: GENDERS,
        message: "Invalid gender",
      },
    },
    fbAvatarFileName: {
      type: String,
      trim: true,
      required: false,
    },
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, minlength: 5, trim: true, required: true },
    userName: { type: String, required: false },
    role: {
      type: String,
      trim: true,
      default: "user",
    },
    isActive: {
      type: Boolean,
      trim: true,
      default: false,
    },
    registered: {
      type: Boolean,
      trim: true,
      default: false,
    },
    creator: {
      type: String,
      required: false,
      // TODO:
      // type: Schema.Types.ObjectId,
      // ref: "User",
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

UserSchema.statics.TYPES = TYPES;
UserSchema.statics.GENDERS = GENDERS;
UserSchema.statics.DEFAULT_AVATARS = DEFAULT_AVATARS;
UserSchema.statics.register = async function (userAttributes) {
  try {
    // const salt = await bcryptjs.genSalt();
    // const passwordHash = await bcryptjs.hash(password, salt);
    console.log("userAttributes: ", userAttributes);
    const { fullName, userName, type, email, password } = userAttributes;

    // User alredy registered?
    if (await User.findOne({ email })) {
      throw new Error("An account with this email already exists");
      // return res.status(400).json({
      //   errors: {
      //     email: "An account with this email already exists.",
      //   },
      // });
    }

    // TODO:Valdiate type + gender

    //TODO: just for now - use a guessing lib for that
    const gender = _.sample(User.GENDERS);
    const fbAvatarFileName = `${type}_${gender}_${_.sample(
      User.DEFAULT_AVATARS
    )}`;
    const passwordHash = await User.createPasswordHash(password);

    const registeredUser = await User.create({
      type,
      email,
      gender,
      fbAvatarFileName,
      password: passwordHash,
      fullName,
      userName: userName ?? fullName,
    });

    return registeredUser;
  } catch (err) {
    console.log("[ERROR] User#register: ", err);
    throw err;
  }
};
UserSchema.statics.createPasswordHash = async function (password) {
  try {
    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    return passwordHash;
  } catch (err) {
    console.log("[ERROR] User#createPasswordHash: ", err);
    // throw new Error(`[ERROR] User#createPasswordHash: ${err}`);
    throw err;
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
    // throw new Error(`[ERROR] User#reload: ${err}`);
    throw err;
  }
};

// flter password from json responses
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};
UserSchema.methods.getInitials = function () {
  return this.firstName[0] + this.lastName[0];
};

// activate pagination plugin
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);
module.exports = User;
