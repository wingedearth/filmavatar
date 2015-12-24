// Set up modules
  var express        = require('express');
  var path           = require('path');
  var favicon        = require('serve-favicon');
  var logger         = require('morgan');
  var cookieParser   = require('cookie-parser');
  var bodyParser     = require('body-parser');
  var methodOverride = require('method-override');
  var debug          = require('debug')('app:http');
  var _              = require('lodash');

// connect to database and environmental variables
  var mongoose       = require('./server/config/database');
                       require('dotenv').load();

// create the express application
  var app            = express();

// define CORS headers
  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }

//Test content routes
app.use('/arcane', function(req, res, next) {
  res.send('"There is no religion higher than Truth." - Helena P. Blavatsky');
  next();
});


// Set up middleware

  app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(allowCrossDomain);
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());

  // Allows use of HTTP verbs (e.g. PUT, DELETE) where client doesn't support it.
  app.use(methodOverride('X-HTTP-Method-Override'));

  // make 'public' a root folder
  app.use(express.static(path.join(__dirname, 'client')));

// require('./server/routes/api')(app);

// error handlers

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler, will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });


module.exports = app;


