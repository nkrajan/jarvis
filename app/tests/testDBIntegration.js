/**
 * Created with IntelliJ IDEA.
 * User: Rajan
 * Date: 5/14/13
 * Time: 6:44 PM
 * To change this template use File | Settings | File Templates.
 */
/** Import dependencies **/
var DbContext = require('../models/DBContext.js');
var async = require('async');

/** Initialize DbContext **/
var dbContext = new DbContext();

async.series({

    /** First initialize the db **/
    loadDbContext: function(callback) {
        /** Start the dbContext sync **/
        dbContext.sync(function(e){
            if(!e){
                console.log("DbContext Loaded");
                callback(null);
            }else{
                console.log('Could not load the DbContext: ' + e);
            }
        });
    }

});



