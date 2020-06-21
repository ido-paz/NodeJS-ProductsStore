var events = require("events");
var fs = require("fs");
var User = require("./User");
const { json } = require("body-parser");
//
module.exports = class UsersDB {
  users = [];
  eventEmitter = new events.EventEmitter();
  //
  constructor(users) {
    if (users) {
      this.users = users.map((user) => {
        return new User(user.name, user.password);
      });
    }
  }
  //
  add(user) {
    this.users.push(user);
    this.save();
    this.eventEmitter.emit("added", user);
  }
  //
  delete(user) {
    let userIndex = this.users.findIndex((u, i, users) => {
      if (u === user) {
        this.save();
        return true;
      }
      return false;
    });
    let de = this.users.splice(userIndex, 1);
    this.eventEmitter.emit("removed", user);
  }
  //
  get() {
    this.eventEmitter.emit("reading", this.users);
    return this.users;
  }
  //
  save() {
    fs.writeFile("./data/users.json", JSON.stringify(this.users), (err) =>
      console.log(err)
    );
    this.eventEmitter.emit("saved", this.users);
  }
  //
  authenticate(name, password) {
    if (this.users) {
      let user = this.users.find((user, index, arr) => {
        if (user.name == name && user.password == password) return true;
      });
    }
    return false;
  }
};
