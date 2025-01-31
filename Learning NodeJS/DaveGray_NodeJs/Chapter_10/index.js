const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const { errorHandler, requestLogger } = require("./middleware/index.js");
const verifyJWT = require("./middleware/verifyJWT.js");
// const verifyRoles = require("./middleware/verifyRoles.js");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials.js");
const PORT = process.env.PORT || 3500;

// REVISIT: middlewares:-
//? Custom Middleware:-
app.use(requestLogger);
app.use(credentials);

//? Third Party Middleware:-
app.use(cors(corsOptions)); //* cors => Cross Origin Resource Sharing

//? Built-in Middleware:-
app.use(express.urlencoded({ extended: false })); //* content-type: application/x-www-form-urlencoded
app.use(express.json()); //* for json
// app.use("/", express.static(path.join(__dirname, "/public")));

// note: middleware for cookie
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

// REVISIT: Routing:-
app.use("/", require("./router/root"));
app.use("/register", require("./router/register.js"));
app.use("/auth", require("./router/auth.js"));
app.use("/refresh", require("./router/refresh.js"));
app.use("/logout", require("./router/logout.js"));
app.use(verifyJWT);
// app.use(verifyRoles);
app.use("/employees", require("./router/api/employees"));

// note: it works like default of switch:-
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type(".txt").send("404 Not Found");
  }
});
// note: if there is any kind of error left:-
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
