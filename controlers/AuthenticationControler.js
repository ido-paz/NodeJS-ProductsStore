const User = require("../models/User");
const express = require("express");
const jwtAuthentication = require('../authentication/JWTAuthentication');
const statusCodes = require("http-status-codes");
const helpers = require('../utils/Helpers');
//const UsersDB = require("../models/UsersDB_FS");
const UsersDB = require("../models/UserDB_MSSQL");
//
const router = express.Router();
//
const ret = jwtAuthentication.refreshTokens;
const getJsonMessage = helpers.getJsonMessage;
//
router.post("/login", (req, res, next) => {
    let udb = new UsersDB();
    udb
      .login(req.body.name, req.body.password)
      .then(() => {
        let userData = ret.getItemByKey(req.body.name);
        let refershToken;
        if (userData) {
          refershToken = userData.value;
        }
        else{
          refershToken = jwtAuthentication.getRefreshToken(req.body.name);
          ret.addItem(req.body.name,refershToken);
        }
        let accessToken =jwtAuthentication.getAccessToken(req.body.name);
        res.json({accessToken:accessToken,refershToken:refershToken});
      })
      .catch((error) => {
        next(getJsonMessage(error.message, statusCodes.NOT_FOUND));
      });
});
//
router.post("/getNewAccessToken", (req, res, next) => {
let refershToken = req.body.token;
if(refershToken){
    let userData = ret.getItemByValue(refershToken);
    if (userData) {
    let accessToken =jwtAuthentication.getAccessToken(userData.key);
    res.json({accessToken:accessToken,refershToken:refershToken});
    }
    else next(getJsonMessage('NOT_FOUND', statusCodes.NOT_FOUND));  
}
else next(getJsonMessage('NOT_FOUND', statusCodes.NOT_FOUND));
});
//
router.post("/logout",(req,res,next)=>{
let refershToken = req.body.token;
if(refershToken){
    let userData = ret.getItemByValue(refershToken);
    if (userData) {
    ret.removeItem(userData.key);
    res.json(getJsonMessage(`logged out user ${userData.key}`));
    } 
    else next(getJsonMessage('NOT_FOUND', statusCodes.NOT_FOUND));   
}
else next(getJsonMessage('NOT_FOUND', statusCodes.NOT_FOUND));
});

module.exports = router;