const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// AUTHORS CONTROLLER
router.get("/", (req, res) => {
  Author.find({})
    .then((authors) => {
      res.send(authors);
    })
    .catch(() => {
      res.status(500);
      res.json({
        error: "Something went wrong, please try again later",
      });
    });
});

router.post("/", (req, res) => {
  Author.create(req.body)
    .then((newAuthor) => {
      res.send(newAuthor);
    })
    .catch(() => {
      res.status(500);
      res.json({
        error: "Something went wrong, please try again later",
      });
    });
});

module.exports = router;
