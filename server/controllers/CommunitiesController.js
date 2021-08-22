const Community = require("../models/community");
const Group = require("../models/group");

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
      if (!community) {
        res.status(404).end();
        return;
      }
      res.send(community);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
};
exports.update = function (req, res) {
  const { id } = req.params;

  // db.updateById(id, req.body)
  // Community.updateOne({ _id: id }, req.body)
  Community.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedResource) => {
      if (!updatedResource) {
        res.status(404).end();
        return;
      }
      res.send(updatedResource);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
};
exports.delete = function (req, res) {
  const { id } = req.params;

  // db.deleteById(id)
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

exports.createGroup = function (req, res) {
  const results = {};
  const { id } = req.params;
  const groupAttributes = req.body;
  Community.findById(id)
    .then((community) => {
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
      if (!results?.community) {
        res.status(404).end();
      } else if (e.name === "ValidationError") {
        res.status(400).json(e);
      } else {
        res.status(500).json({
          error: `Something went wrong, please try again later: ${e}`,
        });
      }
    });
};
