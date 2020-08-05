const configJSON = require('../config.json');
let sql = require("mssql");
//
module.exports = class TableBase
{
    tableName=null;
    //
    constructor(tableName) {
      this.tableName =tableName
    }

    async hasConnection() {
        return await this.getData(`select top 1 * from ${tableName}`);
    }
    //
    async getData(tSQL) {
        try {
        let pool = await sql.connect(configJSON.sqlOptions);
        let result = await pool.request().query(tSQL);
        return Promise.resolve(result.recordset);
        } catch (error) {
        return Promise.reject(error);
        }
    }
    //
    async getBy(condition) {
        if (condition) {
          return await this.getData(`select * from ${this.tableName} where ${condition}`);  
        }
        else throw Error('invalid condition');    
      }
};
