var _ = require('underscore');


//
// Is a stream that transform any elements that 
// are not arrays in to single elements arrays.
//
var parseArguments = function (elems) {
  return _.keys(elems).forEach(function (key) {
    elems[key] = elems[key].split(',');
  });
};


var not = function (b) { return !b; };
var id = function (a) { return a; };
var boolParse = function (b) { return b === "true"; };
var intParse = function (a) { return parseInt(a, 10); };


//
// The sanitization required for arguments of certain types
//
var sanitizeLookup = {
  'activity': intParse,
  'fatality': boolParse,
  'occupation': intParse,
  'industries': intParse,
  'injuries': id, // not all injury keys are ints
  'location': intParse,
  'cause': intParse,
  'gender': id,
  'workload': id,
};


var sanitizeValues = function (elems) {
  return _.keys(elems).forEach(function (key) {
    elems[key] = elems[key].map(sanitizeLookup[key]);
  });
};


module.exports = function (router, prefix) {

  // sanitize query data for easier use in queries
  router.use(prefix, function (req, res, next) {
    parseArguments(req.query);
    sanitizeValues(req.query);
    next();
  });
  
  router.get(prefix, function (req, res) {
    res.json(req.query);
  });

};


