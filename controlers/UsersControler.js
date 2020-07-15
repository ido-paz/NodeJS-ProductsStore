const UsersDB = require("../models/UsersDB");
const usersJson = require("../data/users.json");
const User = require("../models/User");
//
module.exports = class UsersControler {
  //   constructor() {//not accessable from local functions
  //     this.usersDB = new UsersDB(usersJson);
  //   }
  //
  add(req, res, next) {
    //let user = req.body;
    let usersDB = new UsersDB(usersJson);
    let user = new User(req.body.name, req.body.password);
    usersDB.add(user);
    res.send("added user");
    return next();
  }
  //
  delete(req, res, next) {
    //let user = req.body;
    res.send("delete api");
    return next();
  }
  //
  get(req, res, next) {
    //let user = req.body;
    //res.send("get api");
    res.json(new UsersDB(usersJson).get());
    return next();
  }
};
