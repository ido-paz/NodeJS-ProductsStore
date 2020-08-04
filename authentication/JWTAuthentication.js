const jwt = require('jsonwebtoken');
const configJSON = require('../config.json');
const statusCodes = require('http-status-codes');
//
module.exports.verifyAccessToken = function(req,res,next){
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(' ')[1];
  if (token) {
    verifyToken(token,configJSON.jwt.secret,req,next);
  }
  else
    next({message:'not authorized',statusCode:statusCodes.UNAUTHORIZED});
}
//
module.exports.verifyRefreshToken = function(req,res,next){
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(' ')[1];
  if (token) {
    verifyToken(token,configJSON.jwt.refreshSecret,req,next);
  }
  else
    next({message:'not authorized',statusCode:statusCodes.UNAUTHORIZED});
}
//
function verifyToken(token,secret,req,next){
  jwt.verify(token,secret,(err,user)=>{
    if (err) {
      err.statusCode = statusCodes.FORBIDDEN;
      next(err);
    }
    else {
      req.user = user;
      next();
    }
  });
}
//
module.exports.getAccessToken = function(name){
  return jwt.sign({name:name},configJSON.jwt.secret,{expiresIn:configJSON.jwt.expiresIn});
}
//
module.exports.getRefreshToken = function(name){
  return jwt.sign({name:name},configJSON.jwt.refreshSecret);
}