const faker = require("faker");
require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = process.env;

const User = require("../models/User");

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    ignoreUndefined: true, // BSON serializer should ignore undefined fields (liek in query params).
  })
  .then(() => {
    console.log("--- Connected to MongoDB");
    console.log("--- MONGO_URI: ", MONGO_URI);

    seedDB();
  })
  .catch((error) => {
    console.error(error);
  });

const dropDB = async function () {
  try {
    console.log("Dropping the database!");
  } catch (e) {
    console.log("Dropping the database effedup!");
  }
};

const seedDB = async function () {
  try {
    dropDB();
    console.log("Seeding the database!");

    // 1. Create a demo admin user with 3 communities
    // - default school community
    // - 1 class community
    // - 1 course community

    let tenantOwner = await User.register({
      type: User.TYPES.TEACHER,
      fullName: "Chuck Bartowski",
      email: "chuckkdsfskxsjd@nerdherd.com",
      password: "Chuck99",
    });
    console.log(tenantOwner);

    // 2. Create 25 new Users

    // for (let i = 0; i <= 10; i++) {
    //   let newUser = await User.register({
    //     type: User.TYPES.TEACHER,
    //     fullName: faker.name.findName(),
    //     email: faker.internet.email(),
    //     password: "NewUser99",
    //   });
    //   console.log(newUser);
    // }
  } catch (error) {
    console.log("Seeding effedup!");
    console.log("error", error);
  }
};
