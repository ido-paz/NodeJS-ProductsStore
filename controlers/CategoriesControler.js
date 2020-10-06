const express = require("express");
const jwtAuthentication = require("../authentication/JWTAuthentication");
const statusCodes = require("http-status-codes");
const helpers = require("../utils/Helpers");
//const UsersDB = require("../models/UsersDB_FS");
const CategoriesDB = require("../models/CategoriesChanels");
//
const router = express.Router();
const vat = jwtAuthentication.verifyAccessToken;
const getJsonMessage = helpers.getJsonMessage;
//
router.get("/", (req, res, next) => {
  new CategoriesDB()
    .getOrderedVisible()
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      next(getJsonMessage(error.message));
    });
});
//
router.get("/:id", (req, res, next) => {
  let categoryID = req.params.id;
  new CategoriesDB()
    .getCategory(categoryID)
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      next(getJsonMessage(error.message));
    });
});
//
module.exports = router;
