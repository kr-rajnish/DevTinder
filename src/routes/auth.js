const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    //validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //hashing password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR: " + error.message);
  }
});

//login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create JWT token
      const token = await user.getJWT();

      // Add token to the cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Success");
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = authRouter;
