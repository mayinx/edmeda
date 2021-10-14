// Community::Create-Service
// Creates a new community and takes care of creator- and member-assignment
const Community = require("../../models/Community");
const _ = require("lodash");

function CreateCommunityService() {}

CreateCommunityService.prototype.run = async function (communityAttributes) {
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
      throw {
        name: "ValidationError",
        status: 400,
        code: "COMMUNITY_ALREADY_EXISTS",
        message: "Community invalid",
        errors: {
          name:
            "A Community with this name already exists - please choose a unique name!",
        },
      };
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
