
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", function (table) {
      table.increments("id")
        .notNullable()
        .primary();
      table.string("username")
        .notNullable()
        .unique()
        .index();
      table.timestamps();
      table.string("hash").notNullable();
      table.string("email")
        .notNullable()
        .unique();
    }),
    knex.schema.createTable("decks", function (table) {
      table.increments("id")
        .notNullable()
        .primary();
      table.string("name").notNullable()
      table.string("description").nullable();
      table.integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("identity").notNullable();
      table.integer("cards_min");
      table.integer("influence_max");
      table.integer("agenda_points_min")
      table.string("image_src").nullable();
      table.timestamps();
    }),
    knex.schema.createTable("cards", function (table) {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.string("type").notNullable();
      table.string("sub_type").notNullable();
      table.integer("cost");
      table.string("faction").notNullable();
      table.integer("faction_cost")
      table.string("text").notNullable();
      table.string("set").notNullable();
      table.integer("number")
        .unsigned()
        .notNullable();
      table.string("illustrator").notNullable();
      table.integer("agenda_points");
      table.integer("strength");
      table.integer("tr") // ?
      table.integer("mu") // ?
      table.integer("influence");
      table.string("image_src");
      table.timestamps();
    }),
    knex.schema.createTable("decks_cards", function(table) {
      table.integer("deck_id")
        .notNullable()
        .references("id")
        .inTable("decks")
        .onDelete("CASCADE");
      table.integer("card_id")
        .notNullable()
        .references("id")
        .inTable("cards")
        .onDelete("CASCADE");
      table.primary(["deck_id", "card_id"]);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("users"),
    knex.schema.dropTable("decks"),
    knex.schema.dropTable("cards"),
    knex.schema.dropTable("decks_cards")
  ]);
};
