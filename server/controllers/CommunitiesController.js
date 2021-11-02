const Community = require("../models/Community");
const Group = require("../models/Group");
const User = require("../models/User");
const RegisterUserService = require("../services/user/register");
const CreateCommunityService = require("../services/community/create");
const { NotFoundError, InternalError } = require("../errors/AppErrors");
const _ = require("lodash");

exports.index = function (req, res) {
  let query = {};
  Community.find({ _id: { $in: req.currentUser.communities } })
    .find(query)
    .populate("creator")
    .then((resources) => {
      res.send(resources);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
};
// TODO: Use community-creation service here instead!
exports.create = async function (req, res) {
  try {
    const { type, name, grade } = req.body;
    let community = await new CreateCommunityService().run({
      type,
      name,
      grade,
      creator: req.currentUser._id,
    });

    res.status(201).send(community);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json(error);
    } else {
      res.status(500).json();
    }
  }
};
exports.find = function (req, res) {
  const { id } = req.params;

  Community.findById(id)
    .populate("groups")
    .populate("creator")
    .then((community) => {
      if (!community) throw new NotFoundError("community", id);
      res.send(community);
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
  Community.findByIdAndUpdate(id, req.body, { new: true })
    .populate("creator")
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
exports.delete = function (req, res) {
  const { id } = req.params;
  Community.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
};

/* NESTED COMMUNITIES RESOURCES */

/* GROUPS*/

//  create new community group
exports.createGroup = function (req, res) {
  const results = {};
  const { id } = req.params;
  const groupAttributes = req.body;
  Community.findById(id)
    .then((community) => {
      if (!community) throw new NotFoundError("community", id);
      results.community = community;
      const { name, type } = groupAttributes;
      return Group.create({
        name: name,
        type: type,
        community: community._id,
      });
    })
    .then((group) => {
      results.group = group;
      results.community.groups.push(group);
      results.community.save();
      res.status(201).send(group);
    })
    .catch((e) => {
      if (e.name === "NotFoundError") {
        res.status(404).json({ error: e });
      } else if (e.name === "ValidationError") {
        res.status(400).json(e);
      } else {
        res.status(500).json({
          error: `Something went wrong, please try again later: ${e}`,
        });
      }
    });
};
// all groups of a community
exports.indexGroups = function (req, res) {
  const { id } = req.params;
  Community.findById(id)
    .populate("groups")
    .then((community) => {
      if (!community) throw new NotFoundError("community", id);
      res.status(200).send(community.groups);
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

exports.findGroup = function (req, res) {
  const { id, groupId } = req.params;
  Group.findOne({ _id: groupId, community: id })
    .then((group) => {
      if (!group) throw new NotFoundError("group", groupId);
      res.status(200).send(group);
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

/* - COMMUNITY USERS / MEMBERS */

// Fetch all community members
// GET api/communities/:id/members
//
// FYI: The json-result contains
// - the unpopulated "community" (which in turn contains the members
//   but just as an _id-ary) and
// - a fully populated community "members" ary
//
// json-result:
//
//  data: {
//    community: { ... } // unpopulated community
//    members: { ... }  // populated community members
//  }
//
exports.indexMembers = function (req, res) {
  const { id } = req.params;
  const result = {
    community: null,
    members: null,
  };
  Community.findById(id)
    .populate("members")
    .then((community) => {
      if (!community) throw new NotFoundError("community", id);
      result.members = community.members;
      result.community = community.depopulate("members");
      res.status(200).send(result);
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

//  Add/create new community member
//  POST api/communities/:id/members
// TODO: Wrap adding and removing of community memebrs in transactions!
exports.addMember = async function (req, res) {
  try {
    const { id } = req.params;
    const memberAttributes = req.body;
    // TODO: Ensure to whitelist permitted attributes/params here!
    const { email } = memberAttributes;

    let community = await Community.findById(id);
    if (!community) throw new NotFoundError("community", id);

    let member = await User.findOne({ email });

    if (!member) {
      // TODO: OF COURSE this has to evolve ;-)
      // TODO: Send email with a registration confirmation token / a default random pw ...
      member = await new RegisterUserService().run({
        ...memberAttributes,
        ...{ password: "NewUser99" },
      });
    }

    if (community.members.includes(member._id)) {
      return res.status(400).json({
        errors: {
          email: "User is already member of this community.",
        },
      });
    }

    ({ community, member } = await community.addMember(member));

    res.status(201).send(member);
  } catch (e) {
    if (e.name === "NotFoundError") {
      res.status(404).json({ error: e });
    } else if (e.name === "ValidationError") {
      res.status(400).json(e);
    } else {
      console.log("ERR CATCHED IN COM CTRL: ", e);

      res.status(500).json({
        error: `Something went wrong, please try again later: ${e}`,
      });
    }
  }
};

// Scoped find of a given community member
// api/communities/:id/members/:memberId
exports.findMember = function (req, res) {
  const { id, memberId } = req.params;
  User.findOne({ _id: memberId, communities: id })
    .then((user) => {
      if (!user) throw new NotFoundError("user", memberId);
      res.status(200).send(user);
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

// Scoped delete / remove of a given community member from the current community
// (!= destroying the user for good)
// DELETE api/communities/:id/members/:memberId
// TODO: Wrap adding and removing of community memebrs in transactions!
exports.removeMember = async function (req, res) {
  try {
    const { id, memberId } = req.params;

    let member = await User.findOne({ _id: memberId, communities: id });
    if (!member) {
      return res.status(400).json({
        errors: {
          user: "User is not a member of this community.",
        },
      });
    }

    let community = await Community.findById(id).populate("creator");
    if (!community) throw new NotFoundError("community", id);

    ({ community, member } = await community.removeMember(
      member,
      req.currentUser
    ));

    res.status(200).send(member);
  } catch (e) {
    if (e.name === "NotFoundError") {
      res.status(404).json({ error: e });
    } else {
      res.status(500).json({
        error: `Something went wrong, please try again later: ${e}`,
      });
    }
  }
};
