require("dotenv").config();
const User = require("../models/User");
const Community = require("../models/Community");
const Group = require("../models/Group");
const Message = require("../models/Message");
const { NotFoundError, InternalError } = require("../errors/AppErrors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* AUTHENTICATION RELATED ROUTES */
exports.register = async (req, res) => {
  try {
    let { email, password, passwordConfirmation, fullName } = req.body;
    const type = "Teacher";

    // validate
    if (!type || !email || !password || !passwordConfirmation || !fullName) {
      return res.status(400).json({
        message: "Not all fields have been entered.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "The password needs to be at least 6 characters long.",
      });
    }

    if (password !== passwordConfirmation) {
      return res
        .status(400)
        .json({ message: "Enter the same password twice for verification." });
    }

    let newUser = await User.register({
      type,
      email,
      password,
      fullName,
    });

    let schoolCommunity = await Community.findOne({
      type: Community.TYPES.TENANT,
    });
    if (!schoolCommunity) {
      schoolCommunity = await Community.create({
        name: "School Community",
        type: Community.TYPES.TENANT,
        creator: newUser._id,
      });
      schoolCommunity = await schoolCommunity.performAfterCreationChores();
    }

    // Either way: add user as member
    ({
      community: schoolCommunity,
      member: newUser,
    } = await schoolCommunity.addMember(newUser));

    res.json({
      id: newUser._id,
      type: newUser.type,
      gender: newUser.gender,
      fullName: newUser.fullName,
      userName: newUser.userName,
      firstName: newUser.firstName,
      fbAvatarFileName: newUser.fbAvatarFileName,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "[USERS#LOGIN] Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`,
    });

    res.json({
      token,
      user: {
        id: user._id,
        type: user.type,
        gender: user.gender,
        fullName: user.fullName,
        userName: user.userName,
        firstName: user.firstName,
        fbAvatarFileName: user.fbAvatarFileName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.validateToken = async (req, res) => {
  try {
    // check header or url parameters or post parameters for token
    const token =
      req.header("x-auth-token") || req.body.token || req.query.token;
    if (!token) return res.status(401).json({ validToken: false });

    // Check token that was passed by decoding token using secret
    const verified = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!verified) return res.status(401).json({ validToken: false });

    const user = await User.findById(verified.id);
    if (!user) return res.status(401).json({ validToken: false });

    // TODO: Check that:
    //Note: you can renew token by creating new token(i.e.
    //refresh it)w/ new expiration time at this point, but I’m
    //passing the old token back.
    // var token = utils.generateToken(user);

    // return res.json(true);
    //return user using the id from JWTToken
    // we don't return the complete user object of course - just the relevant / absolutely needed parts
    return res.json({
      validToken: true,
      token: token,
      user: {
        id: user._id,
        type: user.type,
        gender: user.gender,
        fullName: user.fullName,
        userName: user.userName,
        firstName: user.firstName,
        fbAvatarFileName: user.fbAvatarFileName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DEFAULT RESTFUL ROUTES */

exports.find = function (req, res) {
  const { id } = req.params;

  //TODO: FIlter al sensitive stuff out
  // - check what the conventions are in the js/express community

  User.findById(id)
    .then((resource) => {
      if (!resource) throw new NotFoundError("user", id);
      res.send(resource);
    })
    .catch((e) => {
      if (e.name === "NotFoundError") {
        res.status(404).json({ error: e });
      } else {
        res.status(500).json({
          error: `Something went wrong, please try again later: ${e}`,
        });
      }
    });
};

exports.index = function (req, res) {
  let query = {};
  User.find(query)
    .then((resources) => {
      res.send(resources);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
};
exports.create = function (req, res) {
  User.create(req.body)
    .then((newResource) => {
      res.status(201).send(newResource);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    });
};
exports.find = function (req, res) {
  const { id } = req.params;

  //TODO: FIlter al sensitive stuff out (like pw etc.)
  // - check what the conventions are in teh js/express community

  User.findById(id)
    .then((resource) => {
      if (!resource) throw new NotFoundError("user", id);
      res.send(resource);
    })
    .catch((e) => {
      if (e.name === "NotFoundError") {
        res.status(404).json({ error: e });
      } else {
        res.status(500).json({
          error: `Something went wrong, please try again later: ${e}`,
        });
      }
    });
};

exports.update = function (req, res) {
  const { id } = req.params;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedResource) => {
      if (!updatedResource) throw new NotFoundError("community", id, req.body);
      res.send(updatedResource);
    })
    .catch((e) => {
      if (e.name === "NotFoundError") {
        res.status(404).json({ error: e });
      } else {
        res.status(500).json({
          error: `Something went wrong, please try again later: ${e}`,
        });
      }
    });
};
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* NESTED USERS RESOURCES */

/* GROUPS*/
