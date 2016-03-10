var Promise       = require("bluebird")
  , Bookshelf     = require("../db").Bookshelf
  , bcrypt        = require("bcrypt")
  , bcryptGenSalt = Promise.promisify(bcrypt.genSalt)
  , bcryptHash    = Promise.promisify(bcrypt.hash)
  , bcryptCompare = Promise.promisify(bcrypt.compare);

/**
 * Generate password hash from string.
 * @param {string} password
 * return {*}
 */
function hashPassword(password) {
  return bcryptGenSalt().then(function (salt) {
    return bcryptHash(password, salt);
  });
}

var User = Bookshelf.Model.extend({
  tablename: "users",
  initialize: function () {
    this.on("creating", function (model, attrs, options) {
      return new Promise(function (resolve, reject) {
        hashPassword(model.attributes.hash).then(function (hash) {
          model.set("hash", hash);
          resolve(hash);
        });
      });
    }, this);
  },
  decks: function () {
    return this.hasMany("Deck", "user_id");
  },
  getByUserName: function (username) {
    return this.query({where: {username: username}}).fetch();
  },
  validateCredentials: function (username, password) {
    // TODO:
  },
  changePassword: function (newPassword) {
    // TODO:
  },
  virtuals: {
    fullName: function() {
      return this.get("first_name") + " " + this.get("last_name");
    }
  }
});

var Users = Bookshelf.Collection.extend({
   model: User
});

module.exports = {
  User: User,
  Users: Users
};
