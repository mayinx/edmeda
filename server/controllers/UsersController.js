require("dotenv").config();
const _ = require("lodash");
const User = require("../models/User");
const RegisterUserService = require("../services/user/register");
const LoginUserService = require("../services/user/login");
const { NotFoundError, InternalError } = require("../errors/AppErrors");

// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* AUTHENTICATION RELATED ROUTES */
exports.register = async (req, res) => {
  try {
    let { email, password, passwordConfirmation, fullName } = req.body;

    let newUser = await new RegisterUserService(true).run({
      type: "Teacher",
      isOwner: true,
      email,
      password,
      passwordConfirmation,
      fullName,
    });

    res.json(_.pick(newUser, User.CURRENT_USER_ATTRIBUTES));
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json(error);
    } else {
      res.status(500).json();
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let { token, user } = await new LoginUserService().run({
      email,
      password,
    });

    res.json({ token, user: _.pick(user, User.CURRENT_USER_ATTRIBUTES) });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    if (error.name === "ValidationError") {
      res.status(400).json(error);
    } else {
      res.status(500).json();
    }
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
      user: _.pick(user, User.CURRENT_USER_ATTRIBUTES),
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
