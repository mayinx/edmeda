// Community::Create-Service
// Creates a new community and takes care of creator- and member-assignment
const Community = require("../../models/Community");
const _ = require("lodash");

function CreateCommunityService() {
  console.log("CreateCommunityService-Constructor");
}

CreateCommunityService.prototype.run = async function (communityAttributes) {
  console.log("Running CreateCommunityService-Service");

  try {
    let community = null;
    let {
      type = Community.TYPES.CLASS,
      name,
      grade,
      creator,
    } = communityAttributes;
    let fbProfilePicFileName = `${type}_${_.sample(
      Community.DEFAULT_PROFILE_PICS
    )}`;

    const existingCommunity = await Community.findOne({
      name,
    });
    if (existingCommunity) {
      throw new Error(
        "A Community with this name already exists - please choose a unique name!"
      );
      // return res.status(400).json({
      //   errors: {
      //     name:
      //       "A Community with this name already exists - please choose a unique name!",
      //   },
      // });
    }

    community = await Community.create({
      type,
      name,
      grade,
      creator,
      fbProfilePicFileName,
    });
    community = await community.performAfterCreationChores();

    return community;
  } catch (err) {
    console.log("[ERROR] CreateCommunityService#run: ", err);
    throw err;
  }
};

module.exports = CreateCommunityService;
