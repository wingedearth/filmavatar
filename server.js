var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

var debug         = require('debug')('app:http');
var mongoose      = require('./app_server/config/database');

                    require('dotenv').load();

var app           = express();
