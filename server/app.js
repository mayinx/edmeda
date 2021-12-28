require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

/* Load mongoose and global plugins */
/* (FYI: global mongoose plugins should be reuired before the usage
   of mongoose models of course - and thus before the creation of
   express-routes (which use mongoose models).*/
const mongoose = require("mongoose");
mongoose.plugin(require("./models/plugins/reload"));

const Message = require("./models/Message");

const communitiesRouter = require("./routes/communities");
const usersRouter = require("./routes/users");

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
  socket.on("disconnect", () => {
    try {
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
      const { groupId, userId } = args;
      const roomId = groupId.toString();
      socket.join(roomId);
      const query = {};
      if (groupId) {
        query.group = groupId;
      }
      if (userId) {
        // query.user = userId;
      }

      // TODO: Implement scroll pagination + limit initial messages
      // let roomMessages = await Message.roomMessages(query).limit(10);
      let roomMessages = await Message.roomMessages(query);

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
      const { groupId, userId } = args;
      const roomId = groupId.toString();
      socket.leave(roomId);
    } catch (e) {
      console.log("--- [error]", "leaving group failed:", e);
      socket.emit(
        "error",
        "[SERVER > ON LEAVE]: Couldnt perform requested action (leaving room)"
      );
    }
  });

  // Listen to connected users for a new message.
  // TODO: refactor Message creation
  socket.on("newMessage", (msg, args) => {
    try {
      let message = new Message(msg);
      var ObjectID = require("mongodb").ObjectID;
      const _id = new ObjectID(message.creator);
      message.creator = _id;
      message.createdAt = new Date();
      const { groupId, userId } = args;
      const roomId = groupId.toString();

      message.save(function (err, message) {
        if (err) return console.error(err);

        message.populate("creator", function (err, message) {
          if (err) return console.error(err);

          // Message.countDocuments({}, function (err, count) {
          //   console.log("%d messages", count);
          // });

          // Notify all other users about a new message.
          io.in(roomId).emit("push", message);
        });
      });
    } catch (e) {
      console.log("--- [error]", "creating message failed:", e);
      socket.emit(
        "error",
        "[SERVER > ON NEWMESSAGE]: Couldn't perform requested action (creating and returning message)"
      );
    }
  });
});

// fetch relevant env-vars
const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    ignoreUndefined: true, // BSON serializer should ignore undefined fields (like in query params).
  })
  .then(() => {
    console.log("--- Connected to MongoDB");
    console.log("--- MONGO_URI: ", MONGO_URI);
    httpServer.listen(PORT, () => {
      console.log(`--- Listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
