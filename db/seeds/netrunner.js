var http    = require("http")
  , Promise = require("bluebird")
  , httpGet = Promise.promisify(http.get);
  
function requestCards() {
  return new Promise(function (reject, resolve) {
    http.get("http://netrunnerdb.com/api/cards/", function (res) {
      var body = "";
      res.on("data", function(chunk) {
        body += chunk;
      });
      res.on("error", function (err) {
        reject(err);
      });
      res.on("end", function() {
        body = JSON.parse(body);
        console.log("body_length", body.length);
        body.map(function (card) {
          if (card["last-modified"]) {
            delete card["last-modified"];
          }
          return card;
        });
        resolve(body);
      });
    });
  });
}

function insertCards(knex) {
  return requestCards().then(function (cards) {
    return knex.batchInsert("cards", cards, 50);
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
    insertCards(knex)
  );
};
