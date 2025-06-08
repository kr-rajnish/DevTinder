const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("cookies", req.cookies);
    res.send(user.firstName + " " + "sent a connection request");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = requestRouter;
