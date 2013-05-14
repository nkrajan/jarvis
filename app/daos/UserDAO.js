/**
 * UserService class
 **/
var UserService = (function (dbSchema) {

    /**
     * Constructor.
     */
    var UserService = function (dbSchema) {
        this.User = require('../models/User')(dbSchema);
        /** Setup Hooks **/
        this.User.setUpHooks();
    };

    /**
     *
     * @param email
     * @param password
     * @param callback
     */
    UserService.prototype.addUser = function(email, password, callback) {
        /** Form the user **/
        var user = {
            email: email,
            password: password
        };
        return this.User.create(user, function(err, user){
            return callback(err, user);
        });
    };

    /**
     * Verify the password with the user data
     * @param user     - user
     * @param password - password  to be verified
     * @param callback - callback
     * @returns {*}
     */
    UserService.prototype.verifyPassword = function(user, password, callback){
        return this.User.verifyPassword(user, password, callback);
    };

    /**
     * Find the user based on the email address
     * @param email - email adddress
     * @param next  - callback
     */
    UserService.prototype.findByEmail = function (email, next) {
        return this.User.findByEmail(email, next);
    };

    /**
     * Get a User by id.
     * @param userId - User primary key.
     * @param next   - callback function.
     */
    UserService.prototype.find = function (userId, next) {
        return this.User.find(userId, next);
    };

    /**
     * Get all Users.
     * @param next - callback function.
     */
    UserService.prototype.getAll = function (next) {
        return this.User.all(next);
    };

    /**
     * Update User.
     * @param user - User instance.
     * @param next - callback function.
     */
    UserService.prototype.update = function (user, next) {
        return this.User.upsert(user, next);
    };

    /**
     * Delete User.
     * @param email - User's email address
     * @param next  - callback function.
     */
    UserService.prototype.removeUsersByEmail = function (email, next) {
        this.User.removeUsersByEmail(email, next);
    };

    /**
     * Delete User.
     * @param userId - User's id - primary key
     * @param next  - callback function.
     */
    UserService.prototype.removeUserById = function (userId, next) {
        this.User.removeUserById(userId, next);
    };

    return UserService;

})(UserService);

/** Export the User service class **/
module.exports = UserService;

