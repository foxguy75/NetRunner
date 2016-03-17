var statusReasons = require("../utils").statusReasons;

function response(status, data) {
  return {
    status: status, 
    message: statusReasons[status], 
    data: (data || void 0)
  };
}

function middleware() {
  return function (req, res, next) {
    var json = res.json;
    
    res.json = function (object) {
      json.call(this, response(this.statusCode, object));
    }
    
    next();
  }
}

module.exports = middleware;
