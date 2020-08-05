const configJSON = require('../config.json');
const TableBase = require('./TableBase');
//
module.exports = class ProductsContainer extends TableBase{
  constructor() {super('ProductsContainer');}
};
