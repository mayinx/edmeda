const Community = require("../models/Community");
const Group = require("../models/Group");
const User = require("../models/User");
const { NotFoundError, InternalError } = require("../errors/AppErrors");

exports.index = function (req, res) {
  let query = {};

  console.log("req.currentUser.communities: ", req.currentUser.communities);

  // let query = {userId};
  Community.find({ _id: { $in: req.currentUser.communities } })
    // req.currentUser.communities
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
exports.create = async function (req, res) {
  console.log("COMMUNTIES_CONTROLLER#CREATE");
  console.log("--- req.body: ", req.body);
  try {
    // let resource = null;
    let community = null;

    const { type = Community.TYPES.CLASS, name } = req.body;

    const attributes = {
      ...req.body,
      ...{ type: type, creator: req.currentUser._id },
    };
    console.log("--- attributes: ", attributes);

    const existingCommunity = await Community.findOne({
      name,
    });
    if (existingCommunity) {
      return res.status(400).json({
        errors: {
          name:
            "A Community with this name already exists - please choose a unique name!",
        },
      });
    }

    community = await Community.create(attributes);

    const updatedCommunity = await community.performAfterCreationChores();

    res.status(201).send(updatedCommunity);
  } catch (error) {
    console.log("--- error", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error });
    } else {
      res.status(500).json();
    }
  }
};
exports.find = function (req, res) {
  const { id } = req.params;

  Community.findById(id)
    // TODO: Ask Namir: How to conditionally populate here?
    // (to avoid implementig different api-endpoints for an
    // popualted and unpopulated version)
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
      console.log("updatedResource", updatedResource);
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
      if (!group) throw new NotFoundError("group", id);
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
