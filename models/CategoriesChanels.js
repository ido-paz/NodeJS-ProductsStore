const configJSON = require('../config.json');
const TableBase = require('./TableBase');
//
module.exports = class CategoriesChanels extends TableBase{
  constructor() {super('CategoriesChanels');}
  //
  getOrderedVisible(){
    return this.getData('select id,name,DirectURL from CategoriesChanels where visible=1 and ProductType=3 order by SortOrder');
  }
};
