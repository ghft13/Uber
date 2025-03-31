const userModel = require("../Models/User_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.Authuser = async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackedlist = await userModel.findOne({ token });

  if (isBlackedlist) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_token);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
