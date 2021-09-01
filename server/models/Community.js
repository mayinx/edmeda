const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
var _ = require("underscore");
const User = require("./User");
const Group = require("./Group");

const TYPES = {
  CLASS: "class",
  COURSE: "course",
  TENANT: "tenant", // i.e. the whole school
  CUSTOM: "custom", // i.e. the whole school
};

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
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false, // TODO: Conditionally require
      },
    ],
    grade: {
      type: Number,
      required: false, // Conditonally require that
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

communitiesSchema.statics.TYPES = TYPES;

// performAfterCreationChores();
// userSchema.methods.getFullName = function () {
//   return this.firstName + this.lastName;
// };

communitiesSchema.methods.performAfterCreationChores = async function () {
  try {
    console.log("this: ", this);
    // TODO: What's the instance method version of this ?
    // i.e. something like 'req.currentUser.update(...)' - which doesn't seem to work here?
    // EDIT: Check => 'this.populate('creator').creator.communities.push(this)';
    const user = await User.findOneAndUpdate(
      { _id: this.creator },
      { $push: { communities: this } },
      { new: true }
    );

    const defaultGroups = [
      {
        name: "Community",
        type: "default",
        scope: "all",
        community: this._id,
        order: 0,
      },
      {
        name: "Students",
        type: "default",
        scope: "student",
        community: this._id,
        order: 1,
      },
      {
        name: "Teachers",
        type: "default",
        scope: "teacher",
        community: this._id,
        order: 2,
      },
      {
        name: "Parents",
        type: "default",
        scope: "parents",
        community: this._id,
        order: 3,
      },
    ];

    const groups = await Group.create(defaultGroups);

    console.log("yo - groups: ", groups);

    // TODO: What's the instance method version of this ?
    // i.e. something like 'community.update(...)' - which doesn't seem to work here?
    // TODO: Check => this.groups.push(groups) && this.members.push(this.creator);
    const updatedCommunity = await Community.findOneAndUpdate(
      { _id: this._id },
      // { $push: { groups: groups } },
      { $push: { groups: groups, members: this.creator } },
      { new: true }
    ).populate("creator");

    return updatedCommunity;
  } catch (err) {
    console.log("[ERROR] Community#performAfterCreationChores: ", err);
    throw new Error(`[ERROR] Community#performAfterCreationChores: ${err}`);
  }
};

communitiesSchema.methods.addMember = async function (newMember) {
  try {
    // TODO: What's the instance method version of this ?
    // i.e. something like 'req.currentUser.update(...)' - which doesn't seem to work here?
    // EDIT: TODO: Check =>  nwMember.communities.push(this) && newMember.save();
    let updatedCommunity = null;

    if (!newMember.communities.includes(this._id)) {
      newMember = await User.findOneAndUpdate(
        { _id: newMember._id },
        { $push: { communities: this } },
        { new: true }
      );
    }
    // TODO: What's the instance method version of this ?
    // i.e. something like 'community.update(...)' - which doesn't seem to work here?
    // TODO: Check => this.members.push(newMember); && this.save
    if (!this.members.includes(newMember._id)) {
      updatedCommunity = await Community.findOneAndUpdate(
        { _id: this._id },
        { $push: { members: newMember } },
        { new: true }
      ).populate("creator");
    }

    return { community: updatedCommunity ?? this, member: newMember };
  } catch (err) {
    console.log("[ERROR] Community#addMember: ", err);
    throw new Error(`[ERROR] Community#addMember: ${err}`);
  }
};

// activate pagination plugin
communitiesSchema.plugin(mongoosePaginate);

const Community = mongoose.model("Community", communitiesSchema);
module.exports = Community;
