var http = require("http");

function insertCards(knex, Promise) {
  var request = new Promise(function (resolve, reject) {
    http.request("http://netrunnerdb.com/api/cards/", function (res) {
      var cards = "";
      
      res.on("data", function (chunk) {
        cards += chunk;
      });
      
      res.on("error", function (err) {
        console.error(err);
        reject(err);
      });
      
      res.on("end", function () {
        cards = JSON.parse(cards).map(function (card) {
          delete card["last-modified"];
          return card;
        });
        resolve(cards)
      });
    })
    .end();    
  });
  return request.then(function (cards) {
    return knex.batchInsert("cards", cards, 5);
  });
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
    insertCards(knex, Promise)
  );
};
