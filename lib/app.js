var express    = require("express")
  , app        = express()
  , bodyParser = require("body-parser")
  , routes     = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", routes.users);

app.get('/', function (req, res) {
 res.end('hello world!');
});

module.exports = app;
