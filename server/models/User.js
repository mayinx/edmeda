const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
const _ = require("lodash");

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
const DEFAULT_BANNER_PICS = [
  "pic-1-2kx845.png",
  "pic-2-2kx845.png",
  "pic-3-2kx845.png",
  "pic-4-2kx845.png",
  "pic-5-2kx845.png",
  "pic-6-v2-2kx845.png",
  "pic-7-2kx845.png",
  "pic-8-2kx845.png",
  "pic-9v2-2kx845.png",
  "pic-10-2kx845.png",
  "pic-12-2kx845.png",
  "pic-13-2kx845.png",
  "pic-14-2kx845.png",
  "pic-15-2kx845.png",
  "pic-16-2kx845.png",
  "pic-17-2kx845.png",
  "pic-18-2kx845.png",
  "pic-19-2kx845.png",
  "pic-20-2kx845.png",
];
const CURRENT_USER_ATTRIBUTES = [
  "id",
  "type",
  "gender",
  "fullName",
  "userName",
  "firstName",
  "fbAvatarFileName",
  "fbBannerPicFileName",
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
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, minlength: 5, trim: true, required: true },
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
    intials: {
      type: String,
      required: false,
      trim: true,
      maxlength: 2,
      minlength: 1,
    },
    userName: { type: String, required: false },
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
    fbBannerPicFileName: {
      type: String,
      trim: true,
      required: false,
    },
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
    isOwner: {
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
UserSchema.statics.DEFAULT_BANNER_PICS = DEFAULT_BANNER_PICS;
UserSchema.statics.CURRENT_USER_ATTRIBUTES = CURRENT_USER_ATTRIBUTES;

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
