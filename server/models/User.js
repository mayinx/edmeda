const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
const _ = require("lodash");

const bcryptjs = require("bcryptjs");

const genderDetect = require("gender-detection");

const TYPES = {
  TEACHER: "Teacher",
  STUDENT: "Student",
  PARENT: "Parent",
};
const GENDERS = ["male", "female", "diverse"];
const DEFAULT_AVATARS = [
  "fbAvatar1",
  "fbAvatar2",
  "fbAvatar3",
  "fbAvatar4",
  "fbAvatar5",
  "fbAvatar6",
];

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
    firstName: {
      type: String,
      required: false,
      trim: true,
      maxlength: 80,
      minlength: 1,
    },
    lastName: {
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
    },

    communities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Community",
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
    const { fullName, userName, type, email, password } = userAttributes;

    if (!type || !email || !password || !fullName) {
      throw new Error("Not all fields have been entered.");
      // return res.status(400).json({
      //   message: "Not all fields have been entered.",
      // });
    }

    // User alredy registered?
    if (await User.findOne({ email })) {
      throw new Error("An account with this email already exists");
      // return res.status(400).json({
      //   errors: {
      //     email: "An account with this email already exists.",
      //   },
      // });
    }

    // TODO: Valdiate type + gender
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.replace(`${firstName} `, "");

    //TODO: just for now - use a guessing lib for that
    // const gender = _.sample(User.GENDERS);
    let gender = genderDetect.detect(firstName);
    if (gender === "unknown") gender = "diverse";
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
      firstName,
      lastName,
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
    throw err;
  }
};
// fetch latest versin of the current model object from db
UserSchema.methods.reload = async function () {
  try {
    const reloadedUser = await User.findById(this.id);
    return reloadedUser;
  } catch (err) {
    console.log("[ERROR] User#reload: ", err);
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
