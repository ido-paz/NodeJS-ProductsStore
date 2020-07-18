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
  async add(user) {
    try {
      let users = await this.getAll();
      users.push(user);
      await this.save(users);
      this.eventEmitter.emit("added", user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //
  async delete(name) {
    try {
      this.eventEmitter.emit("delete", name);
      let users = await this.getAll();
      let userIndex = users.findIndex((u, i, users) => {
        if (u.name === name) {
          return true;
        }
        return false;
      });
      if (userIndex > -1) {
        let user = users.splice(userIndex, 1);
        await this.save(users);
        this.eventEmitter.emit("removed", name);
        return Promise.resolve(user[0]);
      } else return Promise.reject(new Error(`user ${name} not found`));
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //
  async get(name) {
    this.eventEmitter.emit("get", name);
    try {
      let users = await this.getAll();
      let user = users.find((u, i) => {
        if (u.name == name) return u;
      });
      if (user) {
        return Promise.resolve(user);
      } else {
        return Promise.reject(new Error(`${name} not found`));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //
  async getAll() {
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
  async save(users) {
    if (users) this.users = users;
    if (this.users) {
      return new Promise((resolve, reject) => {
        fs.writeFile(data_Json_Path, JSON.stringify(this.users), (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    throw new Error("no users to save");
  }
  //
  async login(name, password) {
    try {
      let users = await this.getAll();
      if (users) {
        let user = users.find((user, index, arr) => {
          return user.name === name && user.password === password;
        });
        if (user) return Promise.resolve();
        return Promise.reject(new Error(`invalid user name or password`));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
