- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handler for /test, /hello
- Install nodemon and update scripts inside package.json
- what are dependencies
- what is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)

- initialize git
- gitignore
- create a remote repo on git
- push all code to remote origin

- play with routes and route extinctions ex. /hello, /, /hello/2, /xyz
- order of the routes matter

- install postman app and make a workspace/collection > test API call

-write logic to handle GET, POST, PATCH, PUT, DELETE API Calls and test them on postman.

- Explore routing and use of ?, +, (), \* in the routes
- use of regex in routes /a/, /.\*fly$/
- Reading the query params in the routs
- Reading the dynamic routes

- Multiple Route handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3], rH4, rH5)

- What is Middleware ? why do we need it?
- How express js basically handles requests behind the scans
- Difference app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all users routs, except /user/login
- Error Handling using app.use("/", (err, req, res, next) => {});

- Create a free cluster on mongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the DataBase "Connection-url/devTinder
- Call the connectDB function and connect to database before starting application on 3000.
- create a user schema & user Model.
- Create POST /signup API to add data to database.
- push some documents using API calls from postman.

- JS object vs JSON (difference).
- Add the express.json middleware to your app.
- Make your signup API dynamic to receive data from the end user.

- User.findOne with duplicate email ids, which document(object) returned.
- API- GET user by email.
- API - Feed API - GET /feed - get all the users from the database.
- create a delete user API.
- deference between PATCH and PUT.
- API - Update a user
- Explore all the mongoose Documentation Model methods.
- What are the options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID.

- Explore Schematype options from the documention.
- add required, unique, lowerCase, min, minlength, trim,..
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate conditions on each field in Schema
- Add timeStamps to the userSchema.
- Add API level validation on Patch request & Signup Post api
- Data Sanitizing - Add API validation for each field
- Install validator
- Explore validator library function and Use validator funcs for password, email
- Never trust req.body

- Validate data in Signup Api
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is excrupted password
- Create login API
- Compare passwords and throw errors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile Api and check if you get the cookie back.
- install jsonwebtoken
- IN login API, after email and password validation, create a JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user.
- userAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days.
- Create userSchema method to get JWT()
- Create UserSchema method to comparepassword(passwordInputByUser)

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
