var moment = require("moment");

exports.timestamp = function () {
  return moment().utc().format();
};
