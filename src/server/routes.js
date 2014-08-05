var express = require('express'),

    resources = require('./routes/resources'), 
    aggregate = require('./routes/aggregate'); 


var router = express.Router();


resources(router, '/data');
aggregate(router, '/api/aggregate');


module.exports = router;

