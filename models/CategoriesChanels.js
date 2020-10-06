const configJSON = require("../config.json");
const { getCondition } = require("../utils/Helpers");
const TableBase = require("./TableBase");
//
module.exports = class CategoriesChanels extends TableBase {
  constructor() {
    super("CategoriesChanels");
  }
  //
  getOrderedVisible() {
    return this.getData(
      "select id,name,DirectURL from CategoriesChanels where visible=1 and ProductType=3 order by SortOrder"
    );
  }
  //
  getCategory(categoryID) {
    if (!categoryID || isNaN(categoryID)) throw Error("invalid categoryID");
    return this.getBy(getCondition("id", "=", categoryID));
  }
};
