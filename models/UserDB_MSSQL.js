let sql = require("mssql");
let ASPNET_MEMBERSHIP=require('../models/ASPNET_MEMBERSHIP');
let crypto = require('crypto');
const config = {
  user: "icastuser",
  password: "Dev12sql34",
  server: "172.16.1.55", // You can use 'localhost\\instance' to connect to named instance
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
  async getPasswordData(name) {
    if (name && name.length > 1) {
      let user = await this.getData(
        `select top 1 * from aspnet_Membership where Email='${name}'`
      );
      if (user && user.length > 0) return user[0];
      else throw Error(`user ${name} not found`);
    }
    throw Error("name is mandatory");
  }
  //
  async login(name, password) {
    if (password && password.length > 1) {  
      let passwordData = await this.getPasswordData(name);
      // let passwordData = await this.getData(
      //   `select top 1 * from NetUsersProfile where email='${name}'`
      // );
      //if (user && user.length > 0) {
      if (passwordData) {
        //let aspNet_User = new ASPNET_MEMBERSHIP();
        //let passwordData = aspNet_User.login(name,password);
        const arrayBuffer = crypto.pbkdf2Sync(password, passwordData.PasswordSalt,
                                      0,passwordData.PasswordSalt.length, 'sha1');
        let  base64String = arrayBuffer.toString('base64');
        //let base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        if(passwordData.Password===base64String)
          return 'ok';
          //return user[0];
        else
          throw Error("passwords dont match");
      }
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
