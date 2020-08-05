const statusCodes = require("http-status-codes");
//
module.exports.getJsonMessage = function(message, statusCode) {
    if (statusCode) {
      if (message && message.includes("not found"))
        statusCode = statusCodes.NOT_FOUND;
      return { message: message, statusCode: statusCode };
    } else return { message: message };
  }