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
router.get('/',(req,res,next)=>{
    let categories = [{id:1,name:'a'},{id:2,name:'b'},{id:3,name:'c'}]
    res.json(categories);
});
//
module.exports = router;