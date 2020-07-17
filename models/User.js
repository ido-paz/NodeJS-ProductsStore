module.exports = class User {
  constructor(name, password) {
    if (name && password) {
      this.name = name;
      this.password = password;
    } else {
      throw new Error("name or password blank");
    }
  }
};
//
