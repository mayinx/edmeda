const faker = require("faker");
require("dotenv").config();
const _ = require("lodash");
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = process.env;

const User = require("../models/User");
const Community = require("../models/Community");
const Group = require("../models/Community");
const Message = require("../models/Message");

const RegisterUserService = require("../services/user/register");
const CreateCommunityService = require("../services/community/create");

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    ignoreUndefined: true, // BSON serializer should ignore undefined fields (like in query params).
  })
  // .then(() => {
  .then((db) => {
    console.log("*** Connected to MongoDB ***");
    console.log("--- MONGO_URI: ", MONGO_URI);
    dropDB();
  })
  .then(() => {
    seedDB();
  })
  .catch((error) => {
    console.error(error);
  });

// TODO: dropdb throws an mongo-db-error ("user not allowed to...")
// Until then we empty the collections explicitly one by one - ug
const dropDB = async function () {
  try {
    console.log("Dropping the database!");

    await User.remove({}, function (err) {
      console.log("User-collection removed");
    });
    await Community.remove({}, function (err) {
      console.log("Community-collection removed");
    });
    await Group.remove({}, function (err) {
      console.log("Group-collection removed");
    });
    await Message.remove({}, function (err) {
      console.log("Message-collection removed");
    });

    console.log("Database dropped!");
  } catch (e) {
    console.log("Dropping the database effedup!");
  }
};

const seedDB = async function () {
  try {
    console.log("--- Seeding the database!");

    let communities = [];

    // 1. Create a demo tenantOwner with 5 communities
    // - default school community
    // - 2 class communities
    // - 1 course community
    // - 1 custom community
    let tenantOwner = await new RegisterUserService().run({
      type: User.TYPES.TEACHER,
      isOwner: true,
      fullName: "Chuck Bartowski",
      email: "chuck@nerdherd.com",
      password: "Chuck99",
    });

    let classCommunityOne = await new CreateCommunityService().run({
      type: Community.TYPES.CLASS,
      name: "Class Community 8a",
      grade: 8,
      creator: tenantOwner._id,
    });
    communities.push(classCommunityOne);

    let classCommunityTwo = await new CreateCommunityService().run({
      type: Community.TYPES.CLASS,
      name: "Class Community 9c",
      grade: 9,
      creator: tenantOwner._id,
    });
    communities.push(classCommunityTwo);

    let courseCommunity = await new CreateCommunityService().run({
      type: Community.TYPES.COURSE,
      name: "English Literature",
      grade: 13,
      creator: tenantOwner._id,
    });
    communities.push(courseCommunity);

    let customCommunity = await new CreateCommunityService().run({
      type: Community.TYPES.CUSTOM,
      name: "Custom Community",
      grade: 11,
      creator: tenantOwner._id,
    });
    communities.push(customCommunity);

    // 2. Create 50 new random Users and add them randomly to the previously created groups

    for (let i = 0; i <= 50; i++) {
      let newUser = await new RegisterUserService().run({
        type: _.sample(User.TYPES),
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        password: "NewUser99",
      });
      await _.sample(communities).addMember(newUser);
    }

    console.log("*** Database seeded! ***");
  } catch (error) {
    console.log("Seeding effedup!");
    console.log("error", error);
  }
};
