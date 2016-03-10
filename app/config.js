var path = require("path");

module.exports = {
  development: {
    database: {
      client: "sqlite3",
      connection: {
        filename: path.join(__dirname, "..", ".tmp", "netrunner.db")
      },
      debug: false
    },
    server: {
      host: "127.0.0.1",
      port: 3000
    }
  },
  production: {
    database: {
      client: "mysql",
      connection: {
        host: "127.0.0.1",
        user: "",
        password: "",
        database: "netrunner_db",
        charset: "utf8"        
      }
    },
    server: {}
  }
};
