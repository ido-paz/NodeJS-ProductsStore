const express = require("express")();
const bodyParser = require("body-parser");
const usersControler = require("./controlers/UsersControler");
const productsControler = require("./controlers/ProductsControler");
const categoriesControler = require("./controlers/CategoriesControler");
const categoryBooksControler = require("./controlers/CategoryBooksControler");
const AuthenticationControler = require("./controlers/AuthenticationControler");
const util = require("util");
const statusCodes = require("http-status-codes");
const port = 8080;
let requestID = 0;
//body parser setup
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));
//
express.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//
express.use((req, res, next) => {
  requestID++;
  req.startDate = new Date();
  req.requestID = requestID;
  util.log(
    `request id ${requestID} , started ${req.method} request for url ${req.url}`
  );
  next();
});
//
express.use("/", AuthenticationControler);
//using handler for the specific route
express.use("/users", usersControler);
express.use("/products", productsControler);
express.use("/categories", categoriesControler);
express.use("/categoryBooks", categoryBooksControler);
//global error handler
express.use(logError);
//
express.use((req, res, next) => {
  let durationMS = new Date().getTime() - req.startDate.getTime();
  util.log(
    `request id ${req.requestID} , ended ${req.method} request for url ${req.url}, the request took ${durationMS}ms`
  );
  next();
});
//starting to listen
express.listen(port, () => {
  util.log(`listening on port ${port}`);
});

function logError(err, req, res, next) {
  console.error(err);
  let message = err.name ? err.name + "," + err.message : err.message;
  if (!err.statusCode) err.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
  res.status(err.statusCode).json({ message: message });
}
