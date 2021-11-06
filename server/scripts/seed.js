const faker = require("faker");
require("dotenv").config();
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.plugin(require("../models/plugins/reload"));
const { MONGO_URI } = process.env;

const assert = require("assert").strict;

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
      console.log("--- User-collection removed");
    });
    await Community.remove({}, function (err) {
      console.log("--- Community-collection removed");
    });
    await Group.remove({}, function (err) {
      console.log("--- Group-collection removed");
    });
    await Message.remove({}, function (err) {
      console.log("--- Message-collection removed");
    });

    console.log("Database dropped!");

    const usersCount = await User.countDocuments({}).exec();
    const communitiesCount = await Community.countDocuments({}).exec();
    const groupsCount = await Group.countDocuments({}).exec();
    const messagesCount = await Message.countDocuments({}).exec();
    console.log("--- users count: ", usersCount);
    console.log("--- communities count: ", communitiesCount);
    console.log("--- groupsCount: ", groupsCount);
    console.log("--- messages count: ", messagesCount);
  } catch (e) {
    console.log("Dropping the database effedup!");
  }
};

const seedDB = async function () {
  try {
    console.log("--- Seeding the database!");

    let communities = [];
    let users = [];
    let teachers = [];

    let tenantOwner = await new RegisterUserService().run({
      type: User.TYPES.TEACHER,
      isOwner: true,
      fullName: "Chuck Bartowski",
      gender: "male",
      email: "chuck@nerdherd.com",
      password: "Chuck99",
      fbAvatarFileName: "Teacher_male_fbAvatar6",
    });
    users.push(tenantOwner);
    console.log("Tenant Owner & SchoolCommunity created!");

    let ellieBartowski = await new RegisterUserService().run({
      type: User.TYPES.TEACHER,
      fullName: "Ellie Bartowski",
      gender: "female",
      email: "ellie@nerdherd.com",
      password: "Ellie99",
      fbAvatarFileName: "Teacher_female_fbAvatar2",
    });
    users.push(ellieBartowski);
    teachers.push(ellieBartowski);

    let morganGrimes = await new RegisterUserService().run({
      type: User.TYPES.TEACHER,
      fullName: "Morgan Grimes",
      gender: "male",
      email: "morgan@nerdherd.com",
      password: "Morgan99",
      fbAvatarFileName: "Teacher_male_fbAvatar2",
    });
    users.push(morganGrimes);
    teachers.push(morganGrimes);

    let sarahWalker = await new RegisterUserService().run({
      type: User.TYPES.TEACHER,
      fullName: "Sarah Walker",
      gender: "female",
      email: "sarah@nerdherd.com",
      password: "Sarah99",
      fbAvatarFileName: "Teacher_female_fbAvatar5",
    });
    users.push(sarahWalker);
    teachers.push(sarahWalker);

    let alexMcHugh = await new RegisterUserService().run({
      type: User.TYPES.TEACHER,
      fullName: "Alex McHugh",
      gender: "female",
      email: "alex@nerdherd.com",
      password: "Alex99",
      fbAvatarFileName: "Teacher_female_fbAvatar1",
    });
    users.push(alexMcHugh);
    teachers.push(alexMcHugh);

    // Alex McHugh => Teacher_female_fbAvatar1
    // ellieBartowski => Teacher_female_fbAvatar2

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

    for (let i = 0; i <= 99; i++) {
      let newUser = await new RegisterUserService().run({
        type: _.sample([User.TYPES.STUDENT, User.TYPES.PARENT]),
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
    }

    for await (const community of communities) {
      await community.addMember(_.sample(teachers));
    }
    for await (const user of users) {
      await _.sample(communities).addMember(user);
    }

    // get fresh versions amnd implicitly include tenantCommunity now
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

    console.log("--- communities created: ", communities.length);
    console.log("--- users created: ", users.length);

    const usersCount = await User.countDocuments({}).exec();
    const communitiesCount = await Community.countDocuments({}).exec();
    const groupsCount = await Group.countDocuments({}).exec();
    const messagesCount = await Message.countDocuments({}).exec();

    console.log("--- users count: ", usersCount);
    console.log("--- communities count: ", communitiesCount);
    console.log("--- groupsCount: ", groupsCount);
    console.log("--- messages count: ", messagesCount);
    console.log("--- assert");
    assert.deepStrictEqual(users.length, usersCount);
    assert.deepStrictEqual(communities.length, communitiesCount);

    const schoolCommunity = await Community.findOne({
      type: Community.TYPES.TENANT,
    });
    // communities.push(schoolCommunity);
    // await schoolCommunity.reload();
    assert.deepStrictEqual(schoolCommunity.members.length, usersCount);

    console.log("--- asserted");
    console.log("*** Database seeded! ***");
  } catch (error) {
    console.log("Seeding effedup! - Error: ", error);
  }
};
