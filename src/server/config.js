
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

