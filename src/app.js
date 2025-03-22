const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello From Server /hello!");
});

app.use("/test", (req, res) => {
  res.send("Hello From Server /test!");
});

app.use((req, res) => {
  res.send("Hello From Server!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
