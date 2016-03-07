var express = require("express")
  , router  = express.Router()
  , User    = require("../models/user");

// user list
router.route("/users")
  .get(function (req, res) {
    // TODO:
    res.json({"status": 200, "message": "", "data": {}});
  })
  .post(function (req, res) {
    // TODO:
  });

// user
router.route("/users/:id")
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
