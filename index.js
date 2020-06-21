const express = require("express")();
const bodyParser = require("body-parser");
const UsersControler = require("./controlers/UsersControler");
const util = require("util");
const port = 8080;
//
let usersControler = new UsersControler();
//body parser setup
express.use(bodyParser.urlencoded({ extended: true }));
// express.use(bodyParser.json);

express.get("/", (req, res, next) => {
  //res.send("server listening");
  res.send("{'message' : 'server listening'}");
});

express
  .route("/users")
  .get(
    (req, res, next) => {
      util.log("started users get request");
      return next();
    },
    usersControler.get,
    (req, res, next) => {
      util.log("ended users get request");
    }
  )
  .post(
    (req, res, next) => {
      util.log("started users post request");
      return next();
    },
    usersControler.add,
    (req, res, next) => {
      util.log("ended users post request");
    }
  );

express.listen(port, () => {
  util.log(`listening on port ${port}`);
});
