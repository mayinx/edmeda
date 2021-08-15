const express = require("express");
const router = express.Router();
const Community = require("../models/community");
var _ = require("underscore");

router.get("/", (req, res) => {
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
});

// router.post("/resources",  (req, res) => {
router.post("/", (req, res) => {
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
});

router.get("/:id", (req, res) => {
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
});

router.patch("/:id", (req, res) => {
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
});

router.delete("/:id", (req, res) => {
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
});

module.exports = router;
