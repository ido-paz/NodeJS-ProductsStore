const statusCodes = require("http-status-codes");
//
module.exports.getJsonMessage = function(message, statusCode) {
    if (statusCode) {
      if (message && message.includes("not found"))
        statusCode = statusCodes.NOT_FOUND;
      return { message: message, statusCode: statusCode };
    } else return { message: message };
  }
//
module.exports.getCondition = function(variableName,operator,value){    
    if (variableName && operator &&value) 
        return `${variableName} ${operator} ${value}`;
    throw Error('invalid variableName || operator || value');
}