const express = require("express");

const app = express();

// This will match only GET http method API calls
app.get("/user", (req, res) => {
  res.send({
    first_name: "Rajnish",
    last_name: "Kumar",
  });
});

// This will match only POST http method API calls
app.post("/user", (req, res) => {
  //Write code to send data to database
  res.send("Data is saved to database");
});

// This will match only DELETE http method API calls
app.delete("/user", (req, res) => {
  res.send("Data is deleted from database");
});

// This will match only PUT http method API calls
app.put("/user", (req, res) => {
  res.send("Data is updated in database by put method");
});

// This will match only PATCH http method API calls
app.patch("/user", (req, res) => {
  res.send("Data is updated in database by patch method");
});

//This will match all http method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello From Server /test!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
