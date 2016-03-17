var statusReasons = require("../utils").statusReasons;

function response(status, message, data) {
  return {
    status: status, 
    message: (statusReasons[status] || message), 
    data: (data || void 0)
  };
}

function middleware() {
  return function (req, res, next) {
    var json = res.json;
    
    res.json = function (object) {
      json.call(this, response(this.statusCode, null, object));
    }
    
    next();
  }
}

module.exports = middleware;
