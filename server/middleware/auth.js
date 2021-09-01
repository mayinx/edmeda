const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token - access denied" });

    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed - authorization denied" });

    const user = await User.findById(verified.id);
    if (!user)
      return res.status(401).json({
        msg:
          "Token verification failed - User not found - authorization denied",
      });

    req.currentUser = user;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
