const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
var _ = require("underscore");
const User = require("./User");
const Group = require("./Group");

const TYPES = {
  CLASS: "Class",
  GRADE: "Grade",
  COURSE: "Course",
  TENANT: "Tenant", // i.e. the whole school
  CUSTOM: "Custom", // i.e. the whole school
};

const DEFAULT_PROFILE_PICS = [
  "ComFbProfilePic1",
  "ComFbProfilePic2",
  "ComFbProfilePic3",
  "ComFbProfilePic4",
  "ComFbProfilePic5",
];

const communitiesSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: {
        values: Object.values(TYPES),
        message: "Invalid Community Type",
      },
    },
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
    scope: {
      type: String,
      required: false,
    },
    fbProfilePicFileName: {
      type: String,
      trim: true,
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
communitiesSchema.statics.DEFAULT_PROFILE_PICS = DEFAULT_PROFILE_PICS;
// performAfterCreationChores();
// userSchema.methods.getFullName = function () {
//   return this.firstName + this.lastName;
// };

// TODO: refactor ths ugly beast
communitiesSchema.methods.defaultGroups = function () {
  if (this.type == TYPES.TENANT) {
    return [
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
      {
        name: "School Festival",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 0,
      },
      {
        name: "School Theater",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 1,
      },
      {
        name: "Corona",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 2,
      },
      {
        name: "Climate Change",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 3,
      },
      {
        name: "Misc",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 4,
      },
    ];
  } else {
    return [
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

      {
        name: "English",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 0,
      },
      {
        name: "Math",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 1,
      },
      {
        name: "Science",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 2,
      },
      {
        name: "Sports",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 3,
      },
      {
        name: "Music",
        type: "custom",
        scope: "student",
        community: this._id,
        order: 4,
      },
    ];
  }
};
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

    const groups = await Group.create(this.defaultGroups());

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
    // throw new Error(`[ERROR] Community#performAfterCreationChores: ${err}`);
    throw err;
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
    // throw new Error(`[ERROR] Community#addMember: ${err}`);
    throw err;
  }
};

communitiesSchema.methods.removeMember = async function (
  member,
  actonPerformer = null
) {
  try {
    let updatedCommunity = null;
    const schoolCommunity = await Community.findOne({
      type: Community.TYPES.TENANT,
    });
    if (this._id.equals(schoolCommunity._id)) {
      throw new Error(
        "Users can't be removed from the school community. To remove a user from the main school community, you have to delete the user account for good"
      );
    }
    console.log("Not school community - next >");

    console.log("creator._id: ", this.creator);

    console.log("member._id: ", member._id);

    if (this.creator._id.equals(member._id)) {
      throw new Error(
        "The member to be removed from this community is its creator: No one can remove the creator from its community, not even the creator himself. To remove a creator from its community, you have to destroy the community."
      );
    }

    console.log("actonPerformer._id: ", actonPerformer._id);
    console.log("member._id: ", member._id);
    console.log(
      "member._id === actonPerformer._id: ",
      member._id === actonPerformer._id
    );

    console.log("creator and member are not identical - next >");
    // TODO: later: Distinct between class+ course communites (no self removal possible,
    // at least not for students) and free / custom communities (self removal possible)
    //- and between user types (e.g. teacher's ca remove theselves from any community
    // - except they are the owner/creator or the community is the SchollCommunity etc.)
    if (actonPerformer && member._id.equals(actonPerformer._id)) {
      throw new Error(
        "You tried to remove yourself from this community: No one can remove himself from any community - this has to be done by the community's owner (i.e. its creator)"
      );
    }

    console.log("actonPerformer and member are not identical - next >");

    console.log("--- member: ", member);
    console.log(
      "--- member.communities.includes(this._id): ",
      member.communities.includes(this._id)
    );
    console.log(
      "--- this.members.includes(member._id): ",
      this.members.includes(member._id)
    );

    if (member.communities.includes(this._id)) {
      member = await User.findOneAndUpdate(
        { _id: member._id },
        { $pull: { communities: this._id } },
        { new: true }
      );
    }

    console.log("this: ", this);
    console.log("next! ");

    if (this.members.includes(member._id)) {
      updatedCommunity = await Community.findOneAndUpdate(
        { _id: this._id },
        { $pull: { members: member._id } },
        { new: true }
      ).populate("creator");
    }

    return { community: updatedCommunity ?? this, member };
  } catch (err) {
    console.log("[ERROR] Community#addMember: ", err);
    // throw new Error(`[ERROR] Community#addMember: ${err}`);
    throw err;
  }
};

// activate pagination plugin
communitiesSchema.plugin(mongoosePaginate);

const Community = mongoose.model("Community", communitiesSchema);
module.exports = Community;
