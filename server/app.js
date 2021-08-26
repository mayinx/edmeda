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

// I feel we are gonna need that soon:
// store connections
var allClients = [];

/* FYI: When the client is connected via the socket (i.ee. the socket is established) the "connection"-event is fired and the server can hook into that */
io.on("connection", (socket) => {
  console.log("[SERVER] ON CONNECTION");
  console.log("--- socket connected");
  console.log("--- socket.id: ", socket.id);

  // allClients.push(socket);

  // Join a conversation
  // TODO: Either by groupId (group chat) or userId (individual chat)
  // let roomId = null;
  // let groupId = null;
  // let userId = null;
  // let { roomId } = socket.handshake.query;
  // socket.join(roomId);

  // socket.on("getGroupMessages", (groupId) => {
  //   console.log("Fetching Messages for User Group ", groupId);
  // });

  socket.on("disconnect", () => {
    console.log("[SERVER] ON DISCONNECT");
    console.log("--- SOCKET DISCONNECTED");
    console.log("--- socket.id ", socket.id);
    console.log("--- leaving room: ", socket.roomId);

    var i = allClients.indexOf(socket);
    allClients.splice(i, 1);

    // TODO: Check - that necessary / explicitly I mean
    socket.leave(socket.roomId);
    // socket.leave(roomId);
  });

  socket.on("join", (args) => {
    try {
      // Join a conversation
      // TODO: Either by groupId (group chat) or userId (individual chat)
      console.log("[SERVER] ON JOIN");
      console.log("--- args: ", args);
      // ({ groupId, userId } = args);
      const { groupId, userId } = args;
      const roomId = groupId.toString();
      // socket.roomId = roomId;
      socket.join(roomId);
      socket.roomId = roomId;
      console.log("--- joined room: ", roomId);

      const query = {};
      if (groupId) {
        query.group = groupId;
      }
      if (userId) {
        query.user = userId;
      }

      // TODO: Load Messages either by groupId (group chat) or userId (individual chat)
      // Get the last 10 messages from the database.
      Message.find(query)
        .sort({ createdAt: -1 })
        .limit(10)
        .exec((err, messages) => {
          if (err) return console.error(err);

          // Send the last messages to the user.
          // FYI: "init" can be used client-side
          // to hook into this server side event
          // via socket.io

          // socket.emit("init", messages);
          io.to(roomId).emit("init", messages);
        });
    } catch (e) {
      console.log("--- [error]", "joining group failed:", e);
      socket.emit("error", "couldnt perform requested action");
    }
  });

  // Listen to connected users for a new message.
  socket.on("newMessage", (msg, args) => {
    console.log("[SERVER] ON NEW MESSAGE");
    console.log("--- msg: ", msg);
    console.log("--- args: ", args);
    const message = new Message(msg);

    const { groupId, userId } = args;
    const roomId = groupId.toString();

    console.log("--- current room: ", roomId);
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
    // FYI: "socket.emit" => informs everyone incl. youself
    // FYI: "socket.broadcast.emit" => inform everyone but youself
    // socket.broadcast.emit("push", msg);
    // console.log("roomId", roomId);
    // socket.emit("push", message);
    io.in(roomId).emit("push", message);
    // socket.in(roomId).emit("push", message);
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
