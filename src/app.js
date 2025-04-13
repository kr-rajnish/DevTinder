const express = require("express");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDB = require("./confige/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    //Check if user already exists
    const existingUser = await User.findOne({ emailId: req.body.emailId });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    //saving the user in db.
    const savedUser = await user.save();
    res.send({ message: "User saved successfully", data: savedUser });
  } catch (error) {
    res.status(404).send(error || "Something went wrong to save the user");
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
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
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
    res.status(404).send(error || "Something went wrong to update user");
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
