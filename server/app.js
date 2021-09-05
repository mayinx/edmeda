require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const communitiesRouter = require("./routes/communities");
const usersRouter = require("./routes/users");
const Message = require("./models/Message");
/*
  We create an express app calling
  the express function.
*/
const app = express();

// For SOCKET.IO:
const http = require("http");
const httpServer = http.createServer(app);

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
app.use("/api/users", usersRouter);

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
io.on("connection", async (socket) => {
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
    try {
      console.log("[SERVER] ON DISCONNECT");
      console.log("--- SOCKET DISCONNECTED");
      console.log("--- socket.id ", socket.id);

      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
    } catch (e) {
      console.log("--- [error]", "Diconnecting socket failed:", e);
      socket.emit(
        "error",
        "[SERVER > ON DISCONNECT]: Couldn't perform requested action (diconnecting socket and removing socket from list of active clients / connections)"
      );
    }
  });

  socket.on("join", async (args) => {
    try {
      // Join a conversation
      // TODO: Either by groupId (group chat) or userId (individual chat)
      console.log("[SERVER] ON JOIN");
      console.log("--- socket.id ", socket.id);
      console.log("--- args: ", args);
      // ({ groupId, userId } = args);
      const { groupId, userId } = args;
      const roomId = groupId.toString();
      // socket.roomId = roomId;
      socket.join(roomId);
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
      // TODO: Ask Namir:
      console.log("--- attempt to retrieve roomMessages ");
      let roomMessages = await Message.roomMessages(query).limit(10);
      console.log("--- roomMessages ", roomMessages);
      // Message.find(query)
      //   .sort({ createdAt: -1 })
      //   .limit(10)
      //   .exec((err, messages) => {
      //     if (err) return console.error(err);

      //     // socket.emit("init", messages);
      //     io.to(roomId).emit("init", messages);
      //   });
      io.to(roomId).emit("init", roomMessages);
    } catch (e) {
      console.log("--- [error]", "Joining group failed:", e);
      socket.emit(
        "error",
        "[SERVER > ON JOIN]: Couldn't perform requested action (joining room and/or requesting group messages)"
      );
    }
  });

  socket.on("leave", (args) => {
    try {
      // Join a conversation
      // TODO: Either by groupId (group chat) or userId (individual chat)
      console.log("[SERVER] ON LEAVE");
      console.log("--- socket.id ", socket.id);
      console.log("--- args: ", args);
      // ({ groupId, userId } = args);
      const { groupId, userId } = args;
      const roomId = groupId.toString();
      socket.leave(roomId);
      console.log("--- left room: ", roomId);
    } catch (e) {
      console.log("--- [error]", "leaving group failed:", e);
      socket.emit(
        "error",
        "[SERVER > ON LEAVE]: Couldnt perform requested action (leaving room)"
      );
    }
  });

  // Listen to connected users for a new message.
  socket.on("newMessage", (msg, args) => {
    try {
      console.log("[SERVER] ON NEW MESSAGE");
      console.log("--- socket.id ", socket.id);
      console.log("--- msg: ", msg);
      console.log("--- args: ", args);
      let message = new Message(msg);
      console.log("--- message after new: ", message);

      var ObjectID = require("mongodb").ObjectID;
      const _id = new ObjectID(message.creator);
      message.creator = _id;
      console.log("--- new id: ", _id);
      console.log("--- new id: ", _id._id);

      const { groupId, userId } = args;
      const roomId = groupId.toString();

      console.log("--- current room: ", roomId);
      // Save the message to the database.
      // message.save((err) => {
      //   if (err) return console.error(err);
      // });

      message.save(function (err, message) {
        message.populate("creator", function (err, message) {
          if (err) return console.error(err);
          console.log("message in tralalal: ", message);

          console.log("--- message after save: ", message);

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
    } catch (e) {
      console.log("--- [error]", "creating message failed:", e);
      socket.emit(
        "error",
        "[SERVER > ON NEWMESSAGE]: Couldnt perform requested action (creating and returning message)"
      );
    }
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
    console.log("--- MONGO_URI: ", MONGO_URI);
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
