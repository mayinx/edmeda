require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const communitiesRouter = require("./routes/communities");
const Message = require("./models/Message");
/*
  We create an express app calling
  the express function.
*/
const app = express();

// For SOCKET.IO:
const http = require("http");
const httpServer = http.createServer(app);
// const { Server } = require("socket.io");
// const { Server } = require("socket.io");
// const io = new Server(httpServer);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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
  We have to start the httpServer. We make it listen on the port 4000
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

/* SOCKET.IO */

/* FYI: When the client is connected via the socket (i.ee. the socket is established) the "connection"-event is fired and the server can hook into that */
io.on("connection", (socket) => {
  console.log(`--- SOCKET CONNECTED (id: ${socket.id})`);

  // Join a conversation
  const { groupId } = socket.handshake.query;
  // socket.join(roomID)

  console.log("--- groupId: ", groupId);

  // Get the last 10 messages from the database.
  Message.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, messages) => {
      if (err) return console.error(err);

      // Send the last messages to the user.
      // FYI: "init" can be used client-side
      // to hook into this server side event
      // via socket.io
      socket.emit("init", messages);
    });

  // socket.on("getGroupMessages", (groupId) => {
  //   console.log("Fetching Messages for User Group ", groupId);
  // });

  socket.on("join", (groupId) => {
    socket.join(groupId);
    console.log("--- JOINED GROUP ", groupId);
    //  socket.broadcast.to(groupId).emit("adminMessage", {
    //        name: "admin",
    //        content: `${name} has joined`,
    //    });
  });

  socket.on("disconnect", () => {
    console.log("--- SOCKET DISCONNECTED");
  });

  // Listen to connected users for a new message.
  socket.on("newMessage", (msg) => {
    console.log("Yeah - creating new message! ", msg);
    const message = new Message(msg);

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    Message.countDocuments({}, function (err, count) {
      console.log("%d messages", count);
    });

    // Notify all other users about a new message.
    // FYI: "push" can be used client-side
    // to hook into this server side event
    // via socket.io
    // FYI: socket.emit => informs everyone incl. youself
    // FYI: socket.broadcast.emit => inform everyone but youself
    // socket.broadcast.emit("push", msg);
    socket.emit("push", msg);
  });
});

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
    // app.listen(PORT, () => {
    //   console.log(`--- Listening on http://localhost:${PORT}`);
    // });

    httpServer.listen(PORT, () => {
      console.log(`--- Listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// httpServer.listen(5000, () => {
//   console.log("socket.io httpServer listening on *:5000");
// });
