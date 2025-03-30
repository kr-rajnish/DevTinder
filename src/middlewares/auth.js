const adminAuth = (req, res, next) => {
  console.log("Authenticating...");
  const token = "xyz";
  const isAuthinticated = token === "xyz";
  if (!isAuthinticated) {
    res.status(401).send("Unauthorized request");
  } else {
    console.log("Authenticated");
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User Authenticating...");
  const token = "xyz";
  const isAuthinticated = token === "xyz";
  if (!isAuthinticated) {
    res.status(401).send("Unauthorized request");
  } else {
    console.log("User Authenticated");
    next();
  }
};

module.exports = { adminAuth, userAuth };
