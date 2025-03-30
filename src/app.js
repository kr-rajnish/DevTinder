const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// Error Middleware Placement – The error-handling middleware should have four parameters (err, req, res, next), but it needs to be defined after all normal middleware.

//Handle Auth Middleware for all GET POST,... requests
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All data");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User data");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
