var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var debug          = require('debug')('app:http');
var _              = require('lodash');
var mongoose       = require('./server/config/database');
                     require('dotenv').load(); // load local enviro vars
var app            = express(); // create the express application

// define CORS headers
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

// Set up middleware

