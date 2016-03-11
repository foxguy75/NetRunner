var config    = require("../knexfile.js")
  , env       = "development"
  , knex      = require("knex")(config[env])
  , Bookshelf = require("bookshelf")(knex);

// activate virtuals plugin
Bookshelf.plugin("virtuals");

// ensure that the schema of database is always current
knex.migrate.latest([config]);

module.exports = {
  knex: knex,
  Bookshelf: Bookshelf
};
