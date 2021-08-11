const express = require("express");
const router = express.Router();
const Community = require("../models/community");
var _ = require("underscore");

router.get("/", (req, res) => {
  // TODO: filter by current user
  // deconstructing the query object
  // api/communities?title=sometitle&genre=scifi&...
  //const { page, title, genre, author, isRead } = req.query;
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

  // const myCustomLabels = {
  //   totalDocs: "totalItems",
  //   docs: "data",
  //   limit: "pageSize",
  //   page: "currentPage",
  //   nextPage: "next",
  //   prevPage: "prev",
  //   totalPages: "totalPages",
  //   pagingCounter: "slNo",
  //   meta: "paginator",
  // };

  // Community.find(req.query)
  Community.find(query)
    // Community.paginate(query, { page: page, limit: 20 })
    // .limit(10)
    // .sort("-createdAt")
    // .populate("author") // TODO: If bored
    .then((resources) => {
      // console.log(resources);
      res.send(resources);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
});

// fetch all distinct community genres
router.get("/genres", (req, res) => {
  Community.find({})
    .distinct("genre")
    .then((genres) => {
      res.send(genres);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
});

// fetch all distinct community authors
router.get("/authors", (req, res) => {
  Community.find({})
    .distinct("author")
    .then((authors) => {
      res.send(authors);
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
  // Community.create(_.pick(req.body, "title", "author", "genre", "isRead"))
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
    //.populate("author") // TODO: If bored
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
