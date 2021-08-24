const express = require("express");
const router = express.Router();
// const Community = require("../models/community");
var _ = require("underscore");

const CommunitiesController = require("../controllers/CommunitiesController.js");

/* DEFAUTL RESTFUL COMMUNITIES API INTERFACE */
router.get("/", CommunitiesController.index);
router.post("/", CommunitiesController.create);
router.get("/:id", CommunitiesController.find);
router.patch("/:id", CommunitiesController.update);
router.delete("/:id", CommunitiesController.delete);

/* RESTFUL ROUTES FOR NESTED COMMUNITIES RESOUCRES */

/* - COMMUNITY GROUPS */

// POST api/communities/:id/groups
// => create a new community-usergroup
router.get("/:id/groups", CommunitiesController.indexGroups);
router.post("/:id/groups", CommunitiesController.createGroup);
router.get("/:id/groups/:groupId", CommunitiesController.findGroup);

/* - COMMUNITY USERS */
// ...

module.exports = router;
