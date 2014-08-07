var _ = require('underscore');


var comparisonFieldKey = 'comparison';


//
// Is a stream that transform any elements that 
// are not arrays in to single elements arrays.
//
var parseArguments = function (elems) {
  return _.keys(elems).forEach(function (key) {
    if (key === comparisonFieldKey) return;
    elems[key] = elems[key].split(',');
  });
};


var id = function (a) { return a; };
var boolParse = function (b) { return b === "true"; };
var intParse = function (a) { return parseInt(a, 10); };


//
// The sanitization required for the different types
//
var sanitizeLookup = {
  'activity': intParse,
  'fatality': boolParse,
  'occupation': intParse,
  'industry': intParse,
  'injuries': id, // not all injury keys are ints
  'location': intParse,
  'cause': intParse,
  'gender': id,
  'workload': id,
  'age': intParse,
};


//
// Parse values
//
var sanitizeValues = function (elems) {
  return _.keys(elems).forEach(function (key) {
    if (key === comparisonFieldKey) return;
    elems[key] = elems[key].map(sanitizeLookup[key]);
  });
};


var dbAggregation = require('../db/aggregate');
var config = require('../config');


//
// route configuration for aggregatation
//
module.exports = function (router, prefix) {

  var isValidConstraint = function (key) {
    return key in sanitizeLookup || key === comparisonFieldKey; 
  };

  // request validation
  router.use(prefix, function (req, res, next) {
    if (req.query[comparisonFieldKey] === undefined) {
      res.json(400, { message: 'you need to pick a comparison' });
    }
    else if (!(req.query[comparisonFieldKey] in sanitizeLookup)) {
      res.json(400, { message: 'invalid comparison' });
    }
    else if (!_.every(_.keys(req.query), isValidConstraint)) {
      res.json(400, { message: 'included invalid constraint' });
    }
    else if (req.query[comparisonFieldKey] in req.query) {
      res.json(400, { message: 'you cannot group by a constraint' });
    }
    else if (_.keys(req.query) > 1) {
      res.json(400);
    }
    else {
      next();
    }
  });


  // sanitize query data for easier use in queries
  router.use(prefix, function (req, res, next) {
    try {
      parseArguments(req.query);
      sanitizeValues(req.query);
      next();
    } catch (e) {
      console.error(req.query);
      console.error(e);
      req.json(400, "you provided terrible arguments, why...");
    }
  });

  
  router.get(prefix, function (req, res) {

    dbAggregation({
      requirements: req.query,
      collection: req.db.collection(config.dbCollections["incidents"]),
      comparison: req.query[comparisonFieldKey],
      callback: function (data) {
        res.json(data);
      },
    });

  });
};

