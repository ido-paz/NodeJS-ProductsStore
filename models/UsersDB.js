const data_Json_Path = "./data/users.json";
var events = require("events");
var fs = require("fs");
var User = require("./User");
var usersJson = require("../data/users.json");
//
module.exports = class UsersDB {
  users = [];
  eventEmitter = new events.EventEmitter();
  //
  constructor(users) {
    if (users) {
      mapUsers(users);
    } else {
      this.mapUsers(usersJson);
    }
  }
  //
  mapUsers(users) {
    this.users = users.map((user) => {
      return new User(user.name, user.password);
    });
  }
  //
  add(user) {
    return this.getAll().then((users) => {
      users.push(user);
      this.save(users);
      this.eventEmitter.emit("added", user);
      return user;
    });
  }
  //
  delete(name) {
    this.eventEmitter.emit("delete", name);
    return new Promise((resolve, reject) => {
      this.getAll().then((users) => {
        let userIndex = users.findIndex((u, i, users) => {
          if (u.name === name) {
            return true;
          }
          return false;
        });
        if (userIndex > -1) {
          let user = users.splice(userIndex, 1);
          this.save(users);
          this.eventEmitter.emit("removed", name);
          resolve(user[0]);
        } else reject(new Error(`user ${name} not found`));
      });
    });
  }
  //
  get(name) {
    this.eventEmitter.emit("get", name);
    return this.getAll().then(function (users) {
      //users = JSON.parse(users);
      let user = users.find((u, i) => {
        if (u.name == name) return u;
      });
      if (user) {
        return user;
      } else {
        throw new Error(`${name} not found`);
      }
    });
  }
  //
  getAll() {
    this.eventEmitter.emit("getAll", null);
    return new Promise(function (resolve, reject) {
      fs.readFile(data_Json_Path, "utf8", (err, users) => {
        if (!err) {
          resolve(JSON.parse(users));
        } else {
          console.error(err);
          reject(err);
        }
      });
    });
  }
  //
  save(users) {
    if (users) this.users = users;
    if (this.users) {
      fs.writeFile(data_Json_Path, JSON.stringify(this.users), (err) => {
        if (err) throw err;
      });
    }
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
