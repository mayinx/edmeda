const Community = require("../models/community");
const Group = require("../models/group");
const { NotFoundError, InternalError } = require("../errors/AppErrors");

exports.index = function (req, res) {
  // TODO: filter by current user
  // deconstructing the query object
  //const { page, name, creator, type, grade  } = req.query;
  let query = {};
  // if (title) {
  //   // regex for substring search (case insensitive)
  //   query.title = { $regex: new RegExp(title, "i") };
  // }
  // if (genre) {
  //   query.genre = genre.toLowerCase();
  // }
  // if (isRead) {
  //   query.isRead = isRead;
  // }
  // if (author) {
  //   query.author = author;
  // }
  // TODO: Whitelist permitted filter params with pick
  // _.pick(req.body, "genre", "isRead")
  // Community.find(req.query)
  Community.find(query)
    // Community.paginate(query, { page: page, limit: 20 })
    // .limit(10)
    // .sort("-createdAt")
    // .populate("...")
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
  // TODO: Make whitelisting params work with object arys as well- until then we chicken out here ;-)
  // Community.create(_.pick(req.body, "name", "type", "creator", "grade"))
  // yhcek out "joi" and "jup"
  Community.create(req.body)
    // Community.create(req.body)
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
  Community.findById(id)
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
    .then((updatedResource) => {
      if (!community) throw new NotFoundError("community", id, req.body);
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
  // Just to be double and tripple sure ;-)
  // (a malicious pal could pass in the group id of anoterh community and thsu gain access to a foreign user group - oh noes!)
  // TODO: Check whats the convention here - query via `Community...populate('groups')` and limit that samehow to the desired group - or like the following:
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
