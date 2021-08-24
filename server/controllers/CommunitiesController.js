const Community = require("../models/community");
const Group = require("../models/group");
const { NotFoundError, InternalError } = require("../errors/AppErrors");

exports.index = function (req, res) {
  let query = {};
  Community.find(query)
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
  let resource = null;
  Community.create(req.body)
    .then((newResource) => {
      resource = newResource;
      const defaultGroups = [
        {
          name: "Community",
          type: "default",
          scope: "all",
          community: newResource._id,
          order: 0,
        },
        {
          name: "Students",
          type: "default",
          scope: "student",
          community: newResource._id,
          order: 1,
        },
        {
          name: "Teachers",
          type: "default",
          scope: "teacher",
          community: newResource._id,
          order: 2,
        },
        {
          name: "Parents",
          type: "default",
          scope: "parents",
          community: newResource._id,
          order: 3,
        },
      ];

      return Group.create(defaultGroups);
    })
    .then((groups) => {
      console.log("groups ", groups);
      return Community.findOneAndUpdate(
        { _id: resource._id },
        { $push: { groups: groups } },
        { new: true }
      );
    })
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
