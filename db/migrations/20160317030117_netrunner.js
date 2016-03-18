
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
        .primary();
      table.string("title");
      table.string("type");
      table.string("type_code");
      table.string("subtype");
      table.string("subtype_code");
      table.string("text");
      table.integer("cost");
      table.string("core");
      table.integer("baselink");
      table.integer("strength");
      table.integer("advancementcost");
      table.integer("agendapoints");
      table.string("faction");
      table.string("faction_code");
      table.string("faction_letter");
      table.integer("factioncost");
      table.string("flavor");
      table.string("illustrator");
      table.integer("influencelimit");
      table.integer("minimumdecksize");
      table.integer("number");
      table.integer("quantity");
      table.string("setname");
      table.string("set_code");
      table.string("side");
      table.string("side_code");
      table.boolean("uniqueness");
      table.integer("limited");
      table.string("cycle_code");
      table.integer("cyclenumber");
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
