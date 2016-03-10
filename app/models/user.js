var Promise       = require("bluebird")
  , bookshelf     = require("bookshelf")
  , bcrypt        = require("bcrypt")
  , bcryptGenSalt = Promise.promisify(bcrypt.genSalt)
  , bcryptHash    = Promise.promisify(bcrypt.hash)
  , bcryptCompare = Promise.promisify(bcrypt.compare)
  , User
  , decks         = require(".Deck");

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

User = bookshelf.Model.extend({
  tableName:  "user",
  decks: function () {
    return this.hasMany("Decks", "user_id");
  },
  getDecks: function (username) {
    return this.getByUserName(username).fetch({withRelated: ['decks']}).then(function(user) {
      return(user.related('decks');
    });
  },
  getByUserName: function (username) {
    return this.query({where: {username: username}).fetch();
  },
  validateCredentials: function (username, password) {
    return this.getByUserName(username).then(function (user) {
      if (!user) {
        // TODO: user not found error
        return Promise.reject();
      } else {
        return bcryptCompare(password, user.password).then(function (isMatch) {
          if (!isMatch) {
            // TODO: password invalid error
            return Promise.reject();
          } else {
            return Promise.resolve(); 
          }
        });        
      }
    });
  }
});

module.exports = User;