var Promise       = require("bluebird")
  , bookshelf     = require("bookshelf")
  , bcrypt        = require("bcrypt")
  , bcryptGenSalt = Promise.promisify(bcrypt.genSalt)
  , bcryptHash    = Promise.promisify(bcrypt.hash)
  , bcryptCompare = Promise.promisify(bcrypt.compare)
  , User;

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

User = {};

module.exports = User;
