var http    = require("http")
  , Promise = require("bluebird")
  , httpGet = Promise.promisify(http.get);

function knexInsertCards(knex) {
  return new Promise(function(resolve, reject) {
    http.get("http://netrunnerdb.com/api/cards/", function (res) {
      var body = "";
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        body = JSON.parse(body);
        for (var i = 0, n = body.length; i < n; i++) {
          delete body[i]["last-modified"];
        }
        resolve(knex.batchInsert('cards', body, 100));
      });
    });
  })
}


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
    }),
    
    // insert seed cards entries
    knexInsertCards(knex)
  );
};
