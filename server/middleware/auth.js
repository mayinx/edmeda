const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("[SERVER] Checking Authorization / JWT");
    console.log("--- req.header", req.header);
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

    console.log("--- yay - current user is authorized");

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
