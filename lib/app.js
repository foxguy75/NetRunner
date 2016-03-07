var express    = require("express")
  , app        = express()
  , bodyParser = require("body-parser")
  , morgan     = require("morgan")
  , routes     = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("short"));
app.use("/api", routes.users);
app.use("/api", routes.cards);
app.use("/api", routes.decks);

app.get('/', function (req, res) {
 res.end('hello world!');
});

module.exports = app;
