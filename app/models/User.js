/********** Import schema **************/
var Schema = require('jugglingdb').Schema;
var bcrypt = require('bcrypt');

/********* Describe User Schema ********/
module.exports = function (dbSchema) {

    /**
     * Define the Schema
     * @type {*} - User
     */
    var UserSchema =  dbSchema.define('User', {
            email: { type: String},
            password: {type: String}
        }
    );

    /**
     * Prepare with hooks
     */
    UserSchema.setUpHooks = function() {
        /** hook beforeCreate **/
        UserSchema.beforeCreate = function(done) {
            var salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
            done();
        };
    };

    /**
     * Password
     * @param password - password
     * @param next     - callback
     * @param user     - user
     */
    UserSchema.verifyPassword = function(user, password, next){
        bcrypt.compare(password, user.password, next);
    };

    /**
     * Add the User
     * @param email     - user email address
     * @param password  - user password
     * @param next      - callback function
     */
    UserSchema.addUser = function(email, password, next) {
        /** Form the user **/
        var user = {
            email: email,
            password: password
        };
        UserSchema.create(user, next);
    };

    /**
     * Get all the Users
     * @param callback
     */
    UserSchema.findAll = function(callback){
        return UserSchema.all(callback);
    };

    /**
     * Find the user by email
     * @param email - user email address
     * @param callback
     */
    UserSchema.findByEmail = function(email, callback){
        /** Check if the user exist **/
        UserSchema.all({ where: { email: email} }, function(err, userValues){
            return callback(err, userValues);
        });
    };

    /**
     * Delete the User by email
     * @param email  - email address
     * @param next   - callback function
     */
    UserSchema.removeUserByEmail = function(email, next){
        /** Check if the user exist **/
        UserSchema.all({ where: { email: email} }, function(err, userValues){
            /** if there are more number of users **/
            if(userValues.length > 0){
                /** Loop over all the users **/
                for(var i = 0; i < userValues.length; i++){
                    userValues[i].destroy(function(err){
                        /** If any error then return callback **/
                        if(err){
                            return next(err);
                        }else{
                            return next();
                        }
                    })
                }
                next();
            } else {
                return next(err);
            }
        });
    };

    /**
     * Delete the User by userId
     * @param userId  - userId
     * @param next   - callback function
     */
    UserSchema.removeUserById = function(userId, next){
        /** First find the user by id **/
        UserSchema.find(userId, function(err, user){
            /** return the error with the error and null object **/
            if(err){
                return next(err, null);
            }
            /** If the user does not exist **/
            if(!user){
                return next(null, null);
            }
            return user.destroy(next);
        });
    };

    return UserSchema;
};