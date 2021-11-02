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
const CreateMessageService = require("../services/message/create");

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
    let users = [];

    let tenantOwner = await new RegisterUserService().run({
      type: User.TYPES.TEACHER,
      isOwner: true,
      fullName: "Chuck Bartowski",
      email: "chuck@nerdherd.com",
      password: "Chuck99",
    });
    users.push(tenantOwner);
    console.log("Tenant Owner & SchoolCommunity created!");

    let schoolCommunity = await Community.findOne({
      type: Community.TYPES.TENANT,
    });
    communities.push(schoolCommunity);

    let classCommunityOne = await new CreateCommunityService().run({
      type: Community.TYPES.CLASS,
      name: "Class Community 8a",
      grade: 8,
      creator: tenantOwner._id,
    });
    communities.push(classCommunityOne);
    console.log("Class Community 1 created!");

    let classCommunityTwo = await new CreateCommunityService().run({
      type: Community.TYPES.CLASS,
      name: "Class Community 9c",
      grade: 9,
      creator: tenantOwner._id,
    });
    communities.push(classCommunityTwo);
    console.log("Class Community 2 created!");

    let courseCommunityOne = await new CreateCommunityService().run({
      type: Community.TYPES.COURSE,
      name: "English Literature",
      grade: 13,
      creator: tenantOwner._id,
    });
    communities.push(courseCommunityOne);
    console.log("Course Community 1 created!");

    let courseCommunityTwo = await new CreateCommunityService().run({
      type: Community.TYPES.COURSE,
      name: "History",
      grade: 13,
      creator: tenantOwner._id,
    });
    communities.push(courseCommunityTwo);
    console.log("Course Community 2 created!");

    let customCommunity = await new CreateCommunityService().run({
      type: Community.TYPES.CUSTOM,
      name: "School Activities",
      grade: 11,
      creator: tenantOwner._id,
    });
    communities.push(customCommunity);
    console.log("Custom Community 1 created!");

    for (let i = 0; i < 80; i++) {
      let newUser = await new RegisterUserService().run({
        type: _.sample(User.TYPES),
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        password: "NewUser99",
      });
      users.push(newUser);
      console.log(
        `User ${i + 1} created - Type: `,
        newUser.type,
        "Name: ",
        newUser.fullName
      );
      await _.sample(communities).addMember(newUser);
    }

    // get fresh versions
    communities = await Community.find({});

    for (let i = 0; i < communities.length; i++) {
      let groups = communities[i].groups;
      for (let j = 0; j < groups.length; j++) {
        for (let k = 0; k < _.sample(_.range(3, 8)); k++) {
          await new CreateMessageService().run({
            content: faker.lorem.sentence(),
            creator: _.sample(communities[i].members),
            group: groups[j],
          });
        }
      }
    }

    console.log("*** Database seeded! ***");
    console.log("--- communities created: ", communities.length);
    console.log("--- users created: ", users.length);
  } catch (error) {
    console.log("Seeding effedup!");
    console.log("error", error);
  }
};
