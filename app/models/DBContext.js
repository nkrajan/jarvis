/**
 * User: Rajan
 * Date: 5/9/13
 * Time: 5:12 PM
 */
/**
 * DbContext class
 */
var DbContext = (function () {

    /**
     * Dependencies.
     **/
    var yaml = require("js-yaml");
    var dbConfig = require("../configs/database.yml");
    var Schema = require('jugglingdb').Schema;
    var UserDao = require("../daos/UserDao.js");

    /**
     * Constructor.
     * Add your entities 'DbSet' instance here.
     */
    function DbContext() {
        this.dbSchema = this.initializeDatabase();
        this.userDao = new UserDao(this.dbSchema);
    }

    /**
     * Initialize the database with mysql
     * @returns {Schema} - database schema
     */
    DbContext.prototype.initializeDatabase = function () {
        return new Schema(dbConfig.default.adapter, {
            database : dbConfig.default.database.name,
            username : dbConfig.default.database.username,
            password : dbConfig.default.database.password
        });
    };

    /**
     * Manage Database entities associations.
     */
    DbContext.prototype.buildModels = function () {
        /** Set up relations  **/

    };

    /**
     * Load the default values for the database tables
     */
    DbContext.prototype.loadDefaultValues = function(){

    };

    /**
     * GetUserDao
     * @returns {*} - UserDao Object
     */
    DbContext.prototype.getUserDao = function(){
        return this.userDao;
    };


    /**
     * Database synchronization.
     */
    DbContext.prototype.sync = function (callback) {
        var self = this;
        this.buildModels();
        this.dbSchema.autoupdate(function(e){
            if(!e){
               self.loadDefaultValues();
            }
            callback(e);
        });
    };

    return DbContext;
})();

module.exports = DbContext;