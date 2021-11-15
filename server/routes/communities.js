const express = require("express");
const router = express.Router();
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
router.get("/:id/groups", auth, CommunitiesController.indexGroups);
router.post("/:id/groups", auth, CommunitiesController.createGroup);
router.get("/:id/groups/:groupId", auth, CommunitiesController.findGroup);

/* - COMMUNITY USERS */
router.get("/:id/members", auth, CommunitiesController.indexMembers);
router.post("/:id/members", auth, CommunitiesController.addMember);
router.get("/:id/members/:memberId", auth, CommunitiesController.findMember);
router.patch(
  "/:id/members/:memberId",
  auth,
  CommunitiesController.updateMember
);
router.delete(
  "/:id/members/:memberId",
  auth,
  CommunitiesController.removeMember
);

module.exports = router;
