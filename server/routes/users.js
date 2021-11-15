const express = require("express");
const router = express.Router();
var _ = require("underscore");
const auth = require("../middleware/auth");

const UsersController = require("../controllers/UsersController.js");

/* DEFAUTL RESTFUL COMMUNITIES API INTERFACE */
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.post("/validateToken", UsersController.validateToken);
// router.get("/", auth, UsersController.index);
// router.post("/", auth, UsersController.create);
// router.get("/:id", auth, UsersController.find);

// router.patch("/:id", auth, UsersController.update);
// router.delete("/:id", auth, UsersController.delete);

/* RESTFUL ROUTES FOR NESTED USERS RESOUCRES */

/* - USERS GROUPS */

// POST api/communities/:id/groups
// => create a new community-usergroup
// router.get("/:id/groups", UsersController.indexGroups);
// router.post("/:id/groups", UsersController.createGroup);
// router.get("/:id/groups/:groupId", UsersController.findGroup);

module.exports = router;
