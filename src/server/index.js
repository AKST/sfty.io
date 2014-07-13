var express = require('express'),
    connect = require('connect');

function startApp() {
  var app   = express(),
      port  = process.env.PORT || 3000,
      files = __dirname+'./../../public';

  app.use(connect.logger());
  app.use(connect.compress());
  app.use(connect.json());
  app.use(connect.query());

  app.use('/', connect.static(files));
  app.listen(port);
}

startApp();
