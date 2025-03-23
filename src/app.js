const express = require("express");

const app = express();

//Advance Routing

// app.get("/ab?c", (req, res) => {
//   res.send({
//     first_name: "Rajnish",
//     last_name: "Kumar",
//   });
// });

// app.get("/ab+c", (req, res) => {
//   res.send({
//     first_name: "Rajnish",
//     last_name: "Kumar",
//   });
// });

// app.get("/ab*cd", (req, res) => {
//   res.send({
//     first_name: "Rajnish",
//     last_name: "Kumar",
//   });
// });

// app.get("/a(bc)?d", (req, res) => {
//   res.send({
//     first_name: "Rajnish",
//     last_name: "Kumar",
//   });
// });

// app.get(/a/, (req, res) => {
//   res.send({
//     first_name: "Rajnish",
//     last_name: "Kumar",
//   });
// });

// app.get(/.*fly$/, (req, res) => {
//   res.send({
//     first_name: "Rajnish",
//     last_name: "Kumar",
//   });
// });

//passing data in query params in routes => called Dynamic routing
//http://localhost:3000/user?userId=12345&password=123456789

// app.get("/user", (req, res) => {
//   const quaryData = req.query;
//   console.log(quaryData);
//   res.send({
//     first_name: "Rajnish",
//     last_name: "Kumar",
//     quaryData,
//   });
// });

//Passing data in params of path variable => called Dynamic Routing
//http://localhost:3000/user/:userId

app.get("/user/:userId", (req, res) => {
  const paramsData = req.params;
  console.log(paramsData);
  res.send({
    first_name: "Rajnish",
    last_name: "Kumar",
    paramsData,
  });
});

app.use("/test", (req, res) => {
  res.send("Hello From Server /test!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
