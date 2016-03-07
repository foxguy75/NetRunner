var app = require("../lib").app;

app.set("port", (process.env.PORT || 8000));
app.listen(app.get("port"), function () {
  console.log("NetRunner application instance running.");
});
