var Bookshelf = require("../db").Bookshelf;

var Card = Bookshelf.Model.extend({
  tableName: "cards"
});

var Cards = Bookshelf.Collection.extend({
   model: Card
});

module.exports = {
  Card: Card,
  Cards: Cards
};
