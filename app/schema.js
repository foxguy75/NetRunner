var Promise = require("bluebird")
  , knex    = require("knex.js");

exports.build = function () {
  return Promise.all([
    knex.schema.createTableIfNotExists("users", function (table) {
      table.increments("id").primary();
      table.string("username").unique();
      table.timestamps(); 
      table.string("hash");
      table.string("email").unique();
    }),    
    knex.schema.createTableIfNotExists("decks", function (table) {
      table.increments("id").primary();
      table.string("name").unique();
      table.string("description");
      table.integer('user_id')
        .references('id')
        .inTable('users');
      table.integer("influence");
      table.integer("card_count");
      table.integer("card_count_min");
      table.string("image_url");
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists("cards", function (table) {
      table.increments('id').primary();
      table.string("title");
      table.string("type");
      table.string("faction");
      table.integer("cost");
      table.integer("influence");
      table.integer("aganda_points");
      table.string("image_url");
      table.timestamps();
    });    
    knex.schema.createTableIfNotExists("decks_cards", function(table) {
      table.integer("deck_id")
        .references("id")
        .inTable("decks");
      table.integer('card_id')
        .references("id")
        .inTable("cards");
    }),
  ]);
};
