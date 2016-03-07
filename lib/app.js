var express    = require("express")
  , app        = express()
  , bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
 res.end('hello world!');
});

module.exports = app;
