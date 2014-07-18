var express = require('express'),
    config = require('./config'),
    router = express.Router(),
    genericGet = require('./routes/genericGet'); 

var shortHand, endpoint, collectionName;


// procedurally generate routes for resources

for (shortHand in config.resourceCollections) {
  collectionName = config.resourceCollections[shortHand];
  endpoint = '/rest/' + shortHand;
  router.get(endpoint, genericGet(collectionName));
}

module.exports = router;

