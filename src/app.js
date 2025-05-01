const express = require("express");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDB = require("./confige/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //Create JWT token
      const token = jwt.sign({ userId: user._id }, "secretKey");

      // Add token to the cookie
      res.cookie("token", token);

      res.send("Login Success");
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//Get profile
app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;

    if (!token) {
      throw new Error("User not found: invalid token");
    }

    const decodeMessage = jwt.verify(token, "secretKey");
    console.log(decodeMessage);
    const { userId } = decodeMessage;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// geting user by id
app.get("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById(userId);
    if (user === null) {
      return res.status(400).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(404).send(error || "Something went wrong to get user by Id");
    console.log(error);
  }
});

//Feed API - Get all the users in the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); //=> getting all the users
    res.send(users);
  } catch (error) {
    res.status(404).send(error || "Something went wrong to get feed");
  }
});

//Delete User API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (user === null) {
      return res.status(400).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(404).send(error || "Something went wrong to delete user");
  }
});

//Update user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    //Api validation
    const allowedFields = [
      "firstName",
      "lastName",
      "password",
      "about",
      "skills",
    ];
    const isFieldValid = Object.keys(data).every((key) => {
      return allowedFields.includes(key);
    });
    if (!isFieldValid) {
      throw new Error("Invalid fields not allowed");
    }
    if (data.skills.length > 5) {
      throw new Error("Skills cannot be more than 5");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (user === null) {
      const response = {
        success: false,
        message: "User not found",
      };
      return res.status(400).send(response);
    }

    const savedUpdatedUser = await user.save();
    const response = {
      success: true,
      message: "User updated successfully",
      data: savedUpdatedUser,
    };
    res.send(response);
  } catch (error) {
    res
      .status(404)
      .send(error.message || "Something went wrong to update user");
  }
});

connectDB()
  .then(() => {
    console.log("Database is connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database is not connected");
  });
