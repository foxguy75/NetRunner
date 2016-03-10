var config = require("../knexfile.js")
  , env    = "development"
  , knex   = require("knex")(config[env]);

// ensure that the schema of database is always current
knex.migrate.latest([config]);

module.exports = knex;
