let sql = require("mssql");
const config = {
  user: "icastuser",
  password: "Dev12sql34",
  server: "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: "icas2008r2",
  enableArithAbort: false,
};

module.exports = class UserDB_MSSQL {
  constructor() {}

  async hasConnection() {
    return await this.getData("select top 1 * from NetUsersProfile");
  }
  //
  async getData(tSQL) {
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query(tSQL);
      return Promise.resolve(result.recordset);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //
  async getAll() {
    return await this.getData("select top 10 * from NetUsersProfile");
  }
  //
  async get(name) {
    if (name && name.length > 1) {
      let user = await this.getData(
        `select top 1 * from NetUsersProfile where email='${name}'`
      );
      if (user && user.length > 0) return user[0];
      else throw Error("user not found");
    }
    throw Error("name is mandatory");
  }
  //
  async login(name, password) {
    if (name && name.length > 1 && password && password.length > 1) {
      let user = await this.getData(
        `select top 1 * from NetUsersProfile where email='${name}'`
      );
      if (user && user.length > 0) return user[0];
      else throw Error("user not found");
    }
    throw Error("invalid name or password");
  }
  //
  async add(user) {
    if (user.name && user.password) {
      try {
        let created = "01-01-2020"; //new Date().toLocaleDateString();
        let userCreationData = await this.getData(
          `INSERT INTO [dbo].[NetUsersProfile] 
                          ([FullName],[Email],[CountryID],[Password],[Created],[IsActive],[isAdmin],[isConfirmed],[DeviceType])
                            VALUES ( '${user.name}','${user.name}',1,'${user.password}', '${created}', 1, 1, 1,0);
          select @@IDENTITY as UserID`
        );
        if (userCreationData && userCreationData[0].UserID > 0) return user;
        else throw Error("failed to create user");
      } catch (error) {
        throw Error(error);
      }
    } else {
      throw Error("invalid user name or password");
    }
  }
  //
  async delete(name) {
    if (name) {
      let deletedUserData = await this.getData(
        `delete from NetUsersProfile where EMAIL='${name}';select @@ROWCOUNT as [RowCount]`
      );
      if (deletedUserData && deletedUserData[0].RowCount > 0)
        return { name: name };
      else throw Error("Failed to delete user");
    } else {
      throw Error("invalid user name");
    }
  }
};
