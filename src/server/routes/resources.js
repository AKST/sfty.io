var genericGet = require('./genericGet'), 
    config     = require('../config');


module.exports = function (router, prefix) {

  var shortHand, collectionName, endpoint;

  // Procedurally generate resource routes
  //
  // /data/occupations
  // /data/industries
  // /data/activities
  // /data/injuries
  // /data/causes
  // 
  for (shortHand in config.resourceCollections) {
    collectionName = config.resourceCollections[shortHand];
    endpoint = prefix + '/' + shortHand;
    router.get(endpoint, genericGet(collectionName));
  }

};

