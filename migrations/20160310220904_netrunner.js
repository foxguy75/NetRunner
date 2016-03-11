
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", function (table) {
      table.increments("id")
        .unsigned()
        .primary()
        .notNullable();
      table.string("username")
        .unique()
        .index()
        .notNullable();
      table.string("first_name");
      table.string("last_name");
      table.string("gravatar_url", 2083);
      table.binary("hash", 60).notNullable();
      table.string("email")
        .unique()
        .notNullable();
      table.timestamps();
    }),
    knex.schema.createTable("decks", function (table) {
      table.increments("id")
        .unsigned()
        .primary()
        .notNullable();
      table.string("name").notNullable()
      table.string("description").nullable();
      table.integer("user_id")
        .unsigned()
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE");
      table.string("identity").notNullable();
      table.integer("cards_min");
      table.integer("influence_max");
      table.integer("agenda_points_min")
      table.string("image_src", 2083).nullable();
      table.timestamps();
    }),
    knex.schema.createTable("cards", function (table) {
      table.increments("id")
        .unsigned()
        .primary()
        .notNullable();
      table.string("title").notNullable();
      table.string("type").notNullable();
      table.string("sub_type").notNullable();
      table.integer("cost");
      table.string("faction").notNullable();
      table.integer("influence");
      table.string("text").notNullable();
      table.string("set").notNullable();
      table.integer("number").notNullable();
      table.string("illustrator").notNullable();
      table.integer("agenda_points");
      table.integer("strength");
      table.integer("tr")
      table.integer("mu")
      table.string("image_src", 2083);
      table.timestamps();
    }),
    knex.schema.createTable("decks_cards", function(table) {
      table.integer("deck_id")
        .unsigned()
        .references("decks.id")
        .notNullable()
        .onDelete("CASCADE");
      table.integer("card_id")
        .unsigned()
        .references("cards.id")
        .notNullable()
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
