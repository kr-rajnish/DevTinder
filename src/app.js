const express = require("express");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDB = require("./confige/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  //saving the user in db.
  try {
    //Check if user already exists
    const existingUser = await User.findOne({ emailId: req.body.emailId });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const savedUser = await user.save();
    res.send({ message: "User saved successfully", data: savedUser });
  } catch (error) {
    res.status(400).send(error || "Something went wrong to save the user");
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
