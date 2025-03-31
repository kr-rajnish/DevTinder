const mongoose = require("mongoose");

//importing Schema
const { Schema } = mongoose;

//Defining Schema
const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  emailId: { type: String },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
});

//creating a module
const User = mongoose.model("User", userSchema);

//Exporting the module
module.exports = User;
