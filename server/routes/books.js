const express = require("express");
const router = express.Router();
const Book = require("../models/book");
var _ = require("underscore");

router.get("/", (req, res) => {
  // deconstructing the query object
  // api/books?title=sometitle&genre=scifi&...
  const { page, title, genre, author, isRead } = req.query;
  let query = {};
  if (title) {
    // regex for substring search (case insensitive)
    query.title = { $regex: new RegExp(title, "i") };
  }
  if (genre) {
    query.genre = genre.toLowerCase();
  }
  if (isRead) {
    query.isRead = isRead;
  }
  if (author) {
    query.author = author;
  }

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

  // Book.find(req.query)
  // Book.find(query)
  Book.paginate(query, { page: page, limit: 20 })
    // .limit(10)
    // .sort("-createdAt")
    // .populate("author") // TODO: If bored
    .then((resources) => {
      res.send(resources);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
});

// fetch all distinct book genres
router.get("/genres", (req, res) => {
  Book.find({})
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

// fetch all distinct book authors
router.get("/authors", (req, res) => {
  Book.find({})
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
  // Book.create(_.pick(req.body, "title", "author", "genre", "isRead"))
  // yhcek out "joi" and "jup"
  Book.create(req.body)
    // Book.create(req.body)
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
  Book.findById(id)
    //.populate("author") // TODO: If bored
    .then((book) => {
      if (!book) {
        res.status(404).end();
        return;
      }
      res.send(book);
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
  // Book.updateOne({ _id: id }, req.body)
  Book.findByIdAndUpdate(id, req.body, { new: true })
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
  Book.findByIdAndDelete(id)
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
