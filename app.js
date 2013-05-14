/******************************************
 *                                        *
 *          Application Entry Point       *
 *                                        *
 ******************************************/

/** Module dependencies **/
var express = require('express');
var Router = require('./app/middleware/Router');
var AuthenticationService = require('./app/services/AuthenticationService.js');
var http = require('http');
var path = require('path');
var DbContext = require('./app/models/DbContext.js');

/** Get passport dependencies **/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AppLogger = require('./app/utils/AppLogger');

/** Initialize express **/
var app = express();

/** Initialize Authentication Service **/
var authService = new AuthenticationService(passport, LocalStrategy);
AppLogger.log('info', '***** Starting Application *****');

/** Configure **/
var configure = require('./app/configs/config.js');
/** Call the application configuration method **/
configure(express, __dirname, app);

/** Initialize DbContext **/
var dbContext = new DbContext();
AppLogger.log('info', 'Initializing database');

/** Sync with the database **/
dbContext.sync(function(e){
   if(!e){
       /** Configure application routing here **/
       var routing = new Router(dbContext, app);
       http.createServer(app).listen(app.get('port'), function(){
           AppLogger.log('info', 'Express server listening on port ' + app.get('port'));
       });
   }else{
       AppLogger.log('info', 'Could not start the server: ' + e);
   }
});