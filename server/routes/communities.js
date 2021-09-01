const express = require("express");
const router = express.Router();
// const Community = require("../models/community");
var _ = require("underscore");
const auth = require("../middleware/auth");

const CommunitiesController = require("../controllers/CommunitiesController.js");

/* DEFAULT RESTFUL COMMUNITIES API INTERFACE */
router.get("/", auth, CommunitiesController.index);
router.post("/", auth, CommunitiesController.create);
router.get("/:id", auth, CommunitiesController.find);
router.patch("/:id", auth, CommunitiesController.update);
router.delete("/:id", auth, CommunitiesController.delete);

/* RESTFUL ROUTES FOR NESTED COMMUNITIES RESOUCRES */

/* - COMMUNITY GROUPS */

// POST api/communities/:id/groups
// => create a new community-usergroup
router.get("/:id/groups", CommunitiesController.indexGroups);
router.post("/:id/groups", CommunitiesController.createGroup);
router.get("/:id/groups/:groupId", CommunitiesController.findGroup);

/* - COMMUNITY USERS */
router.get("/:id/members", CommunitiesController.indexMembers);
router.post("/:id/members", CommunitiesController.addMember);
router.get("/:id/members/:memberId", CommunitiesController.findMember);

module.exports = router;
