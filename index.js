const express = require("express")();
const bodyParser = require("body-parser");
const usersControler = require("./controlers/UsersControler");
const util = require("util");
const port = 8080;
//body parser setup
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));
// express.use(bodyParser.json);
express.use((req, res, next) => {
  //util.log(`started ${req.method} request for url ${req.url} `);
  util.log(
    `started ${req.method} request for url ${req.url} ,file handler ${__filename}`
  );
  next();
});
//using handler for the specific route
express.use("/users", usersControler);
//global error handler
express.use(logError);
//starting to listen
express.listen(port, () => {
  util.log(`listening on port ${port}`);
});

function logError(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode).json({ message: err.message });
}
