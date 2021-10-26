// LoginUserService
// Authenticates the gven user & and creates the jwt token

const User = require("../../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const _ = require("lodash");

function LoginUserService() {}

LoginUserService.prototype.run = async function (userAttributes) {
  try {
    const { email, password } = userAttributes;

    if (!email || !password) {
      // return res.status(400).json({ msg: "Not all fields have been entered." }
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

    const user = await User.findOne({ email: email });
    if (!user) {
      // return res
      //   .status(400)
      //   .json({ msg: "No account with this email has been registered." });
      throw {
        name: "ValidationError",
        status: 400,
        code: "EMAIL_DOESNT_EXIST",
        message: "User invalid",
        errors: {
          email: "No account with this email has been registered.",
        },
      };
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      // return res.status(400).json({ msg: "Invalid credentials." });
      throw {
        name: "ValidationError",
        status: 400,
        code: "PASSWORD_MISMATCH",
        message: "Invalid credentials",
        errors: {
          password: "Invalid credentials.",
        },
      };
    }

    const token = await jwt.sign(
      { id: user._id },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: `${process.env.JWT_EXPIRES_IN}`,
      }
    );

    return { token: token, user: user };
  } catch (err) {
    console.log("[ERROR] LoginUserService#run: ", err);
    throw err;
  }
};

module.exports = LoginUserService;
