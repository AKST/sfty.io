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
var exportObj, sort, group, contain;

module.exports = exportObj = function (conf) {

  var requirements = conf.requirements;
  var collection = conf.collection;
  var comparison = conf.comparison;
  var callback = conf.callback;
  var query = [];

  // - apply the match requirements
  // - state the grouping, by grouping constraint
  // - apply a sort

  sort(query);
  group(query, comparison);
  contain(query, requirements);

  console.log(JSON.stringify(query));
  
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
// simple sorting
//
exportObj._applySort = sort = function (dbQuery) {
  objectUtil.writeP(dbQuery, '0.$sort', {
    total: -1 
  });
};


//
// basic grouping
//
exportObj._applyGrouping = group = function (dbQuery, comparison) {
  var fieldName = applications[comparison].field;

  objectUtil.writeP(dbQuery, '1.$group', {
    _id: "$"+fieldName,
    total: { $sum: 1 },
  }); 
};


//
// Applies http query arguments to the db query
//
exportObj._applyConstraints = contain = function (dbQuery, httpQuery) {
  var key, val, application, type, out, path;

  var mongoIsHard = function (e, i, es) {
    if (e !== _.last(es)) {
      return [e, '$elemMatch'];
    }
    else {
      return [e];
    }
  };

  for (key in httpQuery) {
    if (!(key in applications)) continue;

    val = httpQuery[key];
    application = applications[key];
    type = application.type;

    //
    // inserts $elemMatch's
    //
    path = _.flatten(application.field.split('.').map(mongoIsHard)).join('.');

    out = '2.$match.' + path;

    if (type === 'in') {
      objectUtil.writeP(dbQuery, out, {
        $in: val,
      });
    }
    if (type === 'equal') {
      objectUtil.writeP(dbQuery, out, {
        $equal: val[0],
      });
    }
    if (type === 'range') {
      objectUtil.writeP(dbQuery, out, {
        start: { $gt: val[0] },
        end: { $lt: val[1] },
      });
    }
  }
};

