const express = require("express");

const app = express();

// Error Middleware Placement – The error-handling middleware should have four parameters (err, req, res, next), but it needs to be defined after all normal middleware.

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("1st response");
//     // res.send("1at response");
//     next();
//   },
//   (req, res, next) => {
//     console.log("2nd response");
//     // res.send("2nd response");
//     next();
//   },
//   (req, res, next) => {
//     console.log("3rd response");
//     // res.send("3rd response");
//     next();
//   },
//   (req, res, next) => {
//     console.log("4th response");
//     // res.send("4th response");
//     next();
//   },
//   (req, res) => {
//     console.log("5th response");
//     res.send("5th response");
//   }
// );

// //for sending multiple responses at single time.
// // app.get("/user", (req, res) => {
// //   res.write("1st response!\n");
// //   res.write("2nd response!\n");
// //   res.end(); // End the response
// // });

// app.use("/test", (req, res) => {
//   res.send("Hello From Server /test!");
// });

//Error handling middleware
app.get(
  "/user",
  (req, res, next) => {
    try {
      console.log("1st response");
      // Simulate an error
      throw new Error("Something went wrong in 1st middleware!");
      next();
    } catch (err) {
      next(err); // Pass error to the error-handling middleware
      // res.status(500).send(" Something went wrong!");
    }
  },
  (req, res, next) => {
    try {
      console.log("2nd response");
      next();
    } catch (err) {
      next(err);
    }
  },
  (req, res, next) => {
    try {
      console.log("3rd response");
      next();
    } catch (err) {
      next(err);
    }
  },
  (req, res) => {
    console.log("5th response");
    res.send("5th response");
  }
);

// ✅ Proper Error-Handling Middleware (must be placed after all routes)
app.use((err, req, res, next) => {
  console.error("Error caught:", err.message);
  res.status(500).send("Hello From Server! Something went wrong!"); // Send an error response
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
