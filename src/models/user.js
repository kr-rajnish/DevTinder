const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//importing Schema
const { Schema } = mongoose;

//Defining Schema and adding validations
const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, minLength: 4 },
    lastName: { type: String, trim: true },

    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email" + " " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      //custom validation
      validate(value) {
        if (!["male", "female", "other"].includes(value.toLowerCase())) {
          throw new Error("Invalid gender");
        }
      },
    },
    about: { type: String, trim: true, default: "I am a new user" },
    skills: { type: [String] },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "secretKey", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

//creating a module
const User = mongoose.model("User", userSchema);

//Exporting the module
module.exports = User;
