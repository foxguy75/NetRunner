var express = require("express")
  , router  = express.Router()
  , Card    = require("../models/decks");

// user list
router.route("/decks")
  .get(function (req, res) {
    // TODO:
    res.json({"status": 200, "message": "", "data": {}});
  })
  .post(function (req, res) {
    // TODO:
  });

// user
router.route("/decks/:id")
  .get(function (req, res) {
    // TODO:
    res.json({"status": 200, "message": "", "data": {"id": req.params.id}});
  })
  .put(function (req, res) {
    // TODO:
  })
  .delete(function (req, res) {
    // TODO:
  });

module.exports = router;
