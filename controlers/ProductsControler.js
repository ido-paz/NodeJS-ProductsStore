const express = require("express");
const jwtAuthentication = require('../authentication/JWTAuthentication');
const statusCodes = require("http-status-codes");
const helpers = require('../utils/Helpers');
//const UsersDB = require("../models/UsersDB_FS");
const ProductsDB = require("../models/ProductsContainer");
//
const router = express.Router();
const vat =jwtAuthentication.verifyAccessToken;
const getJsonMessage = helpers.getJsonMessage;
//
router.get("/:paramter", (req, res, next) => {
    let paramter = req.params.paramter;
    let condition;
    if (paramter) {
        if (isNaN(paramter)) 
            condition = helpers.getCondition('name','=',"'" + paramter + "'");
        else
            condition = helpers.getCondition('id','=',paramter);            
    }  
    else
        throw Error('invalid parameter');
    //
    let db = new ProductsDB();
    db
      .getBy(condition)
      .then(function (data) {
        if (condition) {
          res.json(data);
          next();  
        }else
          next(getJsonMessage('product not found', statusCodes.NOT_FOUND));
      })
      .catch((error) => {
        next(getJsonMessage(error.message, statusCodes.NOT_FOUND));
      });
  });
//
router.get("/like/:paramter", (req, res, next) => {
    let paramter = req.params.paramter;
    let condition;
    if (paramter) 
        condition = helpers.getCondition('name','like',"'%" + paramter + "%'");
    else
        throw Error('invalid parameter');
    //
    let db = new ProductsDB();
    db
      .getBy(condition)
      .then(function (data) {
        if (data && data.length>0) {
          res.json(data);
          next();  
        }else
          next(getJsonMessage('product not found', statusCodes.NOT_FOUND));      
      })
      .catch((error) => {
        next(getJsonMessage(error.message, statusCodes.NOT_FOUND));
      });
  });
module.exports = router;
