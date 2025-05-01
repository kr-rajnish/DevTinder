const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  //Reade the token from cookie
  //validate the token
  //find the user
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("Token not found!!!!!!!!!");
    }

    const decodeObj = await jwt.verify(token, "secretKey");
    const { _id } = decodeObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("ERROR:" + error.message);
  }
};

module.exports = { userAuth };
