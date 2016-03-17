
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", function (table) {
      table.increments("id")
        .unsigned()
        .primary();
      table.string("username")
        .index();
      table.string("first_name");
      table.string("last_name");
      table.string("gravatar_url", 2083);
      table.char("hash", 60).notNullable();
      table.string("email")
        .unique();
      table.timestamp("created_at")
        .defaultTo(knex.fn.now())
      table.timestamp("updated_at")
        .defaultTo(knex.fn.now());
    }),
    
    knex.schema.createTable("cards", function (table) {
      table.string("code")
        .primary()
        .notNullable();
      table.string("title")
        .notNullable();
      table.string("type")
        .notNullable();
      table.string("type_code")
        .notNullable();
      table.string("subtype")
        .notNullable();
      table.string("subtype_code")
        .notNullable();
      table.string("text")
        .notNullable();
      table.integer("cost");
      table.integer("baselink");
      table.string("faction")
        .notNullable();
      table.string("faction_code")
        .notNullable();
      table.string("faction_letter")
        .notNullable();
      table.integer("factioncost");
      table.string("flavor");
      table.string("illustrator")
        .notNullable();
      table.integer("influencelimit");
      table.integer("minimumdecksize");
      table.integer("number")
        .notNullable();
      table.integer("quantity")
        .notNullable();
      table.string("setname")
        .notNullable();
      table.string("set_code")
        .notNullable();
      table.string("side")
        .notNullable();
      table.string("side_code")
        .notNullable();
      table.boolean("uniqueness")
        .notNullable();
      table.integer("limited")
        .notNullable();
      table.string("cycle_code")
        .notNullable();
      table.integer("cyclenumber")
        .notNullable();
      table.string("ancurLink");
      table.string("url");
      table.string("imagesrc");
      table.timestamp("created_at")
        .defaultTo(knex.fn.now());
      table.timestamp("updated_at")
        .defaultTo(knex.fn.now());
    }),    
    
    knex.schema.createTable("decks", function (table) {
      table.increments("id")
        .unsigned()
        .primary()
        .notNullable();
      table.string("name")
        .notNullable()
      table.string("description")
        .nullable();
      table.integer("user_id")
        .unsigned()
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE");
      table.string("identity")
        .references("cards.code")
        .notNullable();
      table.integer("cards_min");
      table.integer("influence_max");
      table.integer("agenda_points_min");
      table.string("imagesrc", 2083)
        .nullable();
      table.timestamp("created_at")
        .defaultTo(knex.fn.now())
      table.timestamp("updated_at")
        .defaultTo(knex.fn.now());
    }),
    
    knex.schema.createTable("decks_cards", function(table) {
      table.integer("deck_id")
        .unsigned()
        .references("decks.id")
        .notNullable()
        .onDelete("CASCADE");
      table.string("card_code")
        .references("cards.code")
        .notNullable()
        .onDelete("CASCADE");
      table.primary(["deck_id", "card_code"]);
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
