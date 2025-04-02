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
