
// the collections unforunately have terrible names
// so we can access them like this.

exports.dbCollections = {
  incidents: 'incidents',
  injuries: 'injurytypes',
  activities: 'injuryactivities',
  causes: 'injurycauses',
  locations: 'injurylocations',
  occupations: 'occupationtypes',
  industries: 'occupationindustries'
};

exports.resourceCollections = {}; 

var key, value;

for (key in exports.dbCollections) {
  if (key === 'incidents') { continue; }
  value = exports.dbCollections[key];
  exports.resourceCollections[key] = value;
}

exports.MONGO_URL = (function () {
  if (process.env.MONGOHQ_URL) {
    return process.env.MONGOHQ_URL;
  }
  else if (process.env.WERCKER_MONGODB_HOST) {
    return 'mongodb://'+process.env.WERCKER_MONGODB_HOST+'/cp3046';
  }
  else {
    return 'mongodb://localhost:27017/cp3046';
  }
}());

