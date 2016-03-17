var Bookshelf = require("../db").Bookshelf;

var Deck = Bookshelf.Model.extend({
  tableName: "decks",
  user_id: function () {
    return this.belongsTo("User");
  }
});

var Decks = Bookshelf.Collection.extend({
   model: Deck
});

module.exports = {
  Deck: Deck,
  Decks: Decks
};
