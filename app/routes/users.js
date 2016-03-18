var express = require("express")
  , router  = express.Router()
  , User    = require("../models/user");

// user list
router.route("/users")
  .get(function (req, res) {
    // TODO:
    res.status(200).json();
  })
  .post(function (req, res) {
    // TODO:
  });

// user
router.route("/users/:id")
  .get(function (req, res) {
    // TODO:
    res.status(200).json();
  })
  .put(function (req, res) {
    // TODO:
  })
  .delete(function (req, res) {
    // TODO:
  });

module.exports = router;
