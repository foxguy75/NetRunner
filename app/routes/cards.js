var express = require("express")
  , router  = express.Router()
  , db      = require("../models/card")
  , Card    = db.Card
  , Cards   = db.Cards;

router.route("/cards")
  .get(function (req, res) {
    Cards.forge().fetch()
      .then(function (cards) {
        res.status(200).json(cards.toJSON());
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json();
      });
  });

router.route("/cards/:code")
  .get(function (req, res) {
    Card.where({code: req.params.code}).fetch()
      .then(function (card) {
        if (card) {
          res.status(200).json(card.toJSON())
        } else {
          res.status(404).json();
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json();
      });
  });

module.exports = router;
