
exports.seed = function(knex, Promise) {
  return Promise.join(
    // delete all existing entries
    knex("users").del(),
    knex("cards").del(),

    // insert seed user entries
    knex("users").insert({
      username: "jdsantiagojr",
      hash: "$2a$10$Tvc/CsXxdPT0Tbw50jj.DOIQLMGaLzABTeS8977nOFh14hU3lxtz.",
      email: "jdsantiagojr@gmail.com"
    }),
    knex("users").insert({
      username: "foxguy75",
      hash: "$2a$10$Tvc/CsXxdPT0Tbw50jj.DOIQLMGaLzABTeS8977nOFh14hU3lxtz.",
      email: "foxguy75@gmail.com"
    })

    // insert seed cards entries
  );
};
