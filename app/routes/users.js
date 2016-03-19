var express = require("express")
  , router  = express.Router()
  , db    = require("../models/user")
  , User  = db.User
  , Users = db.Users;

router.route("/users")
  .get(function (req, res) {
    Users.forge().fetch()
      .then(function (users){
        res.status(200).json(users.toJSON());
      })
      .catch(function (err) {
       console.log(err);
       res.status(500).json();
      });
  })
  .post(function (req, res) {
    // TODO:
  });

router.route("/users/:id")
  .get(function (req, res) {
    User.where({id: parseInt(req.params.id)}).fetch()
      .then(function (user) {
        if (user) {
          res.status(200).json(user.toJSON());
        } else {
          res.status(404).json();
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json();
      });
  })
  .put(function (req, res) {
    // TODO:
  })
  .delete(function (req, res) {
    // TODO:
  });

module.exports = router;
