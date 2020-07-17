const UsersDB = require("../models/UsersDB");
const User = require("../models/User");
let express = require("express");
let router = express.Router();
let statusCodes = require("http-status-codes");
//
router.get("/", (req, res, next) => {
  let udb = new UsersDB();
  udb
    .getAll()
    .then(function (data) {
      res.json(data);
    })
    .catch((error) => {
      next(getJsonMessage(error.message, statusCodes.INTERNAL_SERVER_ERROR));
    });
});

router.get("/:name", (req, res, next) => {
  let udb = new UsersDB();
  udb
    .get(req.params.name)
    .then(function (data) {
      res.json(data);
    })
    .catch((error) => {
      next(getJsonMessage(error.message, statusCodes.NOT_FOUND));
    });
});
//
router.post("/", (req, res, next) => {
  if (req.body.name && req.body.password) {
    let user = new User(req.body.name, req.body.password);
    let udb = new UsersDB();
    udb
      .add(user)
      .then((user) => {
        res
          .status(statusCodes.CREATED)
          .json(getJsonMessage(`user ${user.name} added`));
      })
      .catch((error) => {
        next(getJsonMessage(error.message, statusCodes.INTERNAL_SERVER_ERROR));
      });
  } else {
    next(getJsonMessage("invalid name or password", statusCodes.BAD_REQUEST));
  }
});

router.delete("/", (req, res, next) => {
  let udb = new UsersDB();
  udb
    .delete(req.body.name)
    .then((user) => {
      res.json(getJsonMessage(`user ${user.name} deleted`));
    })
    .catch((error) => {
      next(getJsonMessage(error.message, statusCodes.INTERNAL_SERVER_ERROR));
    });
});
//
function getJsonMessage(message, statusCode) {
  if (message.includes("not found")) statusCode = statusCodes.NOT_FOUND;
  if (statusCode) return { message: message, statusCode: statusCode };
  else return { message: message };
}
//
module.exports = router;
