var mongoose = require('mongoose');
var db       = mongoose.connection;
var env      = require('./environment');

require ('../models/user');
require('dotenv').load();

// production version
    var dbURI = process.env.DATABASE_URL;

// development version
    // var dbURI = 'mongodb://localhost/' + env.SAFE_TITLE;

// If using local MongoDB, make sure it's turned on.
if (dbURI != process.env.DATABASE_URL) {
    require('net').connect(27017, 'localhost').on('error', function() {
        console.log('BOW BEFORE THE MONGOD, FOOL!');
        process.exit(0);
    });
}

mongoose.connect(dbURI); // connect to MongoDB

// Capture connection events
    mongoose.connection.on('connected', function() {
        console.log('Mongoose connected to ' + dbURI);
    });
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose disconnected');
    });

// Capture termination / restart events
    var gracefulShutdown = function(msg, callback) {
        mongoose.connection.close(function() {
            console.log('Mongoose disconnected through ' + msg);
            callback();
        });
    };
    // For nodemon restarts
    process.once('SIGUSR2', function() {
        gracefulShutdown('nodemon restart', function() {
            process.kill(process.pid, 'SIGUSR2');
        });
    });
    // For app termination
    process.on('SIGINT', function() {
        gracefulShutdown('app termination', function() {
            process.exit(0);
        });
    });
    // For Heroku app termination
    process.on('SIGTERM', function() {
        gracefulShutdown('Heroku app termination', function() {
            process.exit(0);
        });
    });

// Export the connection
module.exports = mongoose;

