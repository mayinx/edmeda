require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const communitiesRouter = require("./routes/communities");

/*
  We create an express app calling
  the express function.
*/
const app = express();

// For SOCKET.IO:
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

/*
  We setup middleware to:
  - parse the body of the request to json for us
  https://expressjs.com/en/guide/using-middleware.html

  Application Level Middleware
*/
app.use(cors());
app.use(express.json());
app.use(function logRequests(req, res, next) {
  console.log("");
  console.log(
    "--------------------------------------------------------------------"
  );
  console.log(new Date().toString());
  console.log("\x1b[33m%s\x1b[0m", `${req.method} ${req.url}`);
  next();
});

app.use("/api/communities", communitiesRouter);

/*
  We have to start the server. We make it listen on the port 4000
*/

/* in production: Serve the production ready React app and re-route
client-side routes to index.html.  */
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "..", "client/build")));
  // Handle React routing, return all requests to React app
  // Anything that doesn't match the above, send back index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
  });
}

// fetch relevant env-vars
const { MONGO_URI, PORT } = process.env;

mongoose
  // .connect("mongodb://localhost:27017/edmeda", {
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    ignoreUndefined: true, // BSON serializer should ignore undefined fields (liek in query params).
  })
  .then(() => {
    console.log("--- Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`--- Listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

/* SOCKET.IO */
io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
