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
  })
  .post(function (req, res) {
    new Card().save(req.body.json)
      .then(function (card) {
        // TODO:
      });
  });

router.route("/cards/:code")
  .get(function (req, res) {
    Cards.forge().fetchOne({where: {code: req.params.code}})
      .then(function (card) {
        if (card) {
          res.status(200).json(card.toJSON())
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
    Cards.forge().fetchOne({where: {code: req.params.code}})
      .then(function (card) {
        if (card) {
          card.destroy().then(function () {
            res.status(202).json()
          });
        } else {
          res.status(404).json();
        }
      });
  });

module.exports = router;
