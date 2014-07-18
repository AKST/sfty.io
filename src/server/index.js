
var express = require('express'),
    connect = require('connect'),
    mongodb = require('mongodb'),
    routes = require('./routes');


function startApp(err, db) {
  if (err) throw err;

  var app   = express(),
      port  = process.env.PORT || 3000,
      files = __dirname+'./../../public';

  // attaches the db for each request
  app.use(function (req, res, next) {
    req.db = db;
    next(); 
  });

  // typical middleware
  app.use(connect.logger());
  app.use(connect.compress());
  app.use(connect.json());
  app.use(connect.query());

  // wire end points
  app.use(routes);

  // static files
  app.use('/', connect.static(files));

  // start app
  app.listen(port);
}

var dbUrl = process.env.MONGOHQ_URL || 
  'mongodb://localhost:27017/cp3046';

mongodb.MongoClient.connect(dbUrl, startApp);

