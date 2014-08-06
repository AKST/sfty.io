var _ = require('underscore');


var writeP = exports.writeP = function (obj, pathStr, data) {
  var path = pathStr.split('.');
  var last = obj;

  _.initial(path).forEach(function (key) {
    if (obj[key] === undefined) {
      last[key] = {};
    }
    last = last[key];
  });

  last[_.last(path)] = data;
};


