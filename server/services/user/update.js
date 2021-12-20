// UpdateUserService
const User = require("../../models/User");
const { NotFoundError, InternalError } = require("../../errors/AppErrors");
const _ = require("lodash");

function UpdateUserService() {}

UpdateUserService.prototype.run = async function (filter, userAttributes) {
  try {
    const { firstName, lastName, email, gender } = userAttributes;

    const user = await User.findOneAndUpdate(
      filter,
      {
        firstName,
        lastName,
        email,
        gender,
        fullName: `${firstName} ${lastName}`,
        initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
      },
      { new: true, runValidators: true }
    );

    if (!user)
      throw new NotFoundError("user", filter._id, filter, userAttributes);

    return user;
  } catch (err) {
    console.log("[ERROR] UpdateUserService#run: ", err);
    throw err;
  }
};

module.exports = UpdateUserService;
