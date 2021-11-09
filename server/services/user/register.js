// RegisterUserService
// Registers a new user to the app and adds him to the main school/tenant-community, unless he's not already a member

const User = require("../../models/User");
const Community = require("../../models/Community");

const genderDetect = require("gender-detection");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");

function RegisterUserService(confirmPw = false) {
  this.confirmPw = confirmPw;
}

RegisterUserService.prototype.run = async function (userAttributes) {
  try {
    let {
      fullName,
      userName,
      type,
      email,
      password,
      passwordConfirmation,
      isOwner,
      fbAvatarFileName,
      gender,
    } = userAttributes;

    if (!type || !email || !password || !fullName) {
      // throw new Error("Not all fields have been entered.");
      // return res.status(400).json({
      //   message: "Not all fields have been entered.",
      // });
      throw {
        name: "ValidationError",
        status: 400,
        code: "MISSING_FIELDS",
        message: "Not all fields have been entered",
        // errors: {
        //   passwordConfirmation:
        //     "Enter the same password twice for verification.",
        // },
      };
    }

    if (this.confirmPw && password !== passwordConfirmation) {
      throw {
        name: "ValidationError",
        status: 400,
        code: "PASSWORD_MISMATCH",
        message: "User invalid",
        errors: {
          passwordConfirmation:
            "Enter the same password twice for verification.",
        },
      };
    }

    // User alredy registered?
    if (await User.findOne({ email })) {
      throw {
        name: "ValidationError",
        status: 400,
        code: "EMAIL_ALREADY_EXISTS",
        message: "User invalid",
        errors: {
          email: "An account with this email already exists.",
        },
      };
    }

    // TODO: Valdiate type + gender
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.replace(`${firstName} `, "");

    //TODO: just for now - use a guessing lib for that
    // const gender = _.sample(User.GENDERS);
    gender ||= genderDetect.detect(firstName);
    if (gender === "unknown" || gender === "unisex") gender = "diverse";
    fbAvatarFileName ||= `${type}_${gender}_${_.sample(User.DEFAULT_AVATARS)}`;
    // const passwordHash = await User.createPasswordHash(password);
    const passwordHash = await this.createPasswordHash(password);

    let registeredUser = await User.create({
      type,
      isOwner,
      email,
      gender,
      fbAvatarFileName,
      password: passwordHash,
      fullName,
      firstName,
      lastName,
      userName: userName ?? fullName,
    });

    let schoolCommunity = await Community.findOne({
      type: Community.TYPES.TENANT,
    });

    if (schoolCommunity) {
      ({
        community: schoolCommunity,
        member: registeredUser,
      } = await schoolCommunity.addMember(registeredUser));
    } else {
      schoolCommunity = await this.createSchoolCommunity(registeredUser);
    }

    return registeredUser;
  } catch (err) {
    console.log("[ERROR] RegisterUserService#run: ", err);
    throw err;
  }
};

RegisterUserService.prototype.createPasswordHash = async function (password) {
  try {
    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    return passwordHash;
  } catch (err) {
    console.log("[ERROR] RegisterUserService#createPasswordHash: ", err);
    throw err;
  }
};

// TODO: Move to Community-model
RegisterUserService.prototype.createSchoolCommunity = async function (creator) {
  try {
    let schoolCommunity = await Community.create({
      name: "School Community",
      type: Community.TYPES.TENANT,
      creator: creator._id,
    });
    schoolCommunity = await schoolCommunity.performAfterCreationChores();

    return schoolCommunity;
  } catch (err) {
    console.log("[ERROR] RegisterUserService#createSchoolCommunity: ", err);
    throw err;
  }
};

module.exports = RegisterUserService;
