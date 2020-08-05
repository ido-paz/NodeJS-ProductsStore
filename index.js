const express = require("express")();
const bodyParser = require("body-parser");
const usersControler = require("./controlers/UsersControler");
const AuthenticationControler = require('./controlers/AuthenticationControler');
const util = require("util");
let statusCodes = require("http-status-codes");
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
//
express.use("/", AuthenticationControler);
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
  let message = err.name ? err.name + ',' + err.message : err.message;
  if (!err.statusCode) err.statusCode= statusCodes.INTERNAL_SERVER_ERROR;
  res.status(err.statusCode).json({ message: message });
}
