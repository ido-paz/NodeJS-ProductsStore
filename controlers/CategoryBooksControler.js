const express = require("express");
const helpers = require("../utils/Helpers");
const TableBase = require("../models/TableBase");
//
const router = express.Router();
const getJsonMessage = helpers.getJsonMessage;
//
router.get("/:id", (req, res, next) => {
  let categoryID = req.params.id;
  let tb = new TableBase();
  tb.getData(
    `exec SelectBooksByControlContainerAutomaticType 3,${categoryID},15`
  )
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      next(getJsonMessage(error.message));
    });
});
//
module.exports = router;
