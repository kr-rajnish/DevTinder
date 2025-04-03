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

app.get("/user", async (req, res) => {
  // geting user by email
  const userEmail = req.body.emailId;
  try {
    //with find method returns an array
    const user = await User.find({ emailId: userEmail }); //=> getting only the users match the emailId.

    if (user.length === 0) {
      return res.status(400).send("User not found");
    }
    res.send(user);

    //   //with findOne method returns only one document
    //   const user = await User.findOne({ emailId: userEmail });
    //   if (user === null) {
    //     return res.status(400).send("User not found");
    //   }
    //   res.send(user);
  } catch (error) {
    res
      .status(404)
      .send(error || "Something went wrong to get user by EmailId");
  }

  // geting user by id
  // const userId = req.body._id;
  // try {
  //   const user = await User.findById(userId);
  //   if (user === null) {
  //     return res.status(400).send("User not found");
  //   }
  //   res.send(user);
  // } catch (error) {
  //   res.status(404).send(error || "Something went wrong to get user by Id");
  //   // console.log(error);
  // }
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
  // const userEmail = req.body.emailId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findOneAndDelete({ emailId: userEmail });
    if (user === null) {
      return res.status(400).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(404).send(error || "Something went wrong to delete user");
  }
});

app.patch("/user", async (req, res) => {
  // const userId = req.body.userId;
  const userEmail = req.body.emailId;
  const data = { firstName: req.body.firstName, lastName: req.body.lastName };
  try {
    // const user = await User.findByIdAndUpdate({ _id: userId }, data, {
    //   returnDocument: "after",
    // });
    const user = await User.findOneAndUpdate({ emailId: userEmail }, data, {
      returnDocument: "after",
    });
    if (user === null) {
      return res.status(400).send("User not found");
    }
    res.send(user);
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
