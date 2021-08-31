const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    console.log("[SERVER] Checking Authorization / JWT");
    console.log("--- req.header", req.header);
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });

    console.log("--- yep - token present");

    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

    console.log("--- yep - token valid");

    const user = await User.findById(verified.id);
    if (!user)
      return res.status(401).json({
        msg:
          "Token verification failed - User not found - authorization denied",
      });

    console.log("--- yay - current user is authorized");
    console.log("--- verified.id: ", verified);
    console.log("--- verified.id: ", verified.id);

    req.currentUser = user;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
