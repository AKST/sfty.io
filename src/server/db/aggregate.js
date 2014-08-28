var _ = require('underscore');


//
// How different http query arguments are applied 
// to the data base query.
//
var applications = {

  'activity': { field: 'incident.activity', type: 'in' },
  'fatality': { field: 'incident.fatal', type: 'equal' },
  'occupation': { field: 'occupation.occupation', type: 'in' },
  'industry': { field: 'occupation.industry', type: 'in' },
  'injuries': { field: 'incident.injury', type: 'in' },
  'location': { field: 'incident.bodyLocation', type: 'in' },
  'cause': { field: 'incident.cause', type: 'in' },
  'gender': { field: 'person.gender', type: 'equal' },
  'workload': { field: 'occupation.workLoad', type: 'equal' },
  'age': { field: 'person.ageGroup', type: 'range' },

};


var objectUtil = require('../util/obj');
var config = require('../config');
var exportObj, sort, group, constrain, project;

module.exports = exportObj = function (conf) {

  var requirements = conf.requirements;
  var collection = conf.collection;
  var comparison = conf.comparison;
  var callback = conf.callback;

  // - relocate fields to simpify matching
  // - apply the match requirements
  // - state the grouping, by grouping constraint
  // - apply a sort

  var query = [
    { $project: project(requirements, comparison) },
    { $match: constrain(requirements) },
    { $group: group(comparison) },
    { $sort: sort() }
  ];

  query = query.filter(function (e) { return e !== null; });
  
  //
  // collecting data on updates, and on end, 
  // send it out as json to the client
  //

  var cursor = collection.aggregate(query, { cursor: { batchSize: 1000 } });
  var data = [];

  cursor.on('data', function (update) {
    data.push(update);
  });

  cursor.on('end', function () {
    callback(data);
  });

};

//
// relocates the fields for easier matching.
//
exportObj._project = project = function (httpQuery, comparison) {
  var application, key, app;

  var projection = {};

  for (application in applications) {
    if (!applications.hasOwnProperty(application)) continue;
    if (httpQuery.hasOwnProperty(application) || application === comparison) {
      projection[application] = "$"+applications[application].field;
    }
  }

  return projection;
};


//
// Applies http query arguments to the db query
//
exportObj._constrain = constrain = function (httpQuery) {
  var val, application, type, path;

  var outObject = {};

  for (var key in httpQuery) {
    if (!httpQuery.hasOwnProperty(key)) continue;
    if (!(key in applications)) continue;

    val = httpQuery[key];
    application = applications[key];
    type = application.type;

    if (type === 'in') {
      objectUtil.writeP(outObject, key, {
        $in: val,
      });
    }
    if (type === 'equal') {
      objectUtil.writeP(outObject, key, val[0]);
    }
    if (type === 'range') {
      objectUtil.writeP(outObject, key, {
        start: { $gt: val[0] },
        end: { $lt: val[1] },
      });
    }
  }

  return outObject;
};


// 
// simple sorting
//
exportObj._sort = sort = function (direction) {
  return {
    total: direction || -1
  };
};


//
// basic grouping
//
exportObj._group = group = function (comparison) {
  return {
    _id: "$"+comparison,
    total: { $sum: 1 },
  };
};



