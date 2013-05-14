/**
 * User: Rajan
 * Date: 5/10/13
 * Time: 11:07 AM
 */

var AuthenticationService = new (function () {

    /**
     * Module dependencies.
     */
    var DbContext = require('../models/dbContext');
    var bcrypt = require('bcrypt-nodejs');

    /**
     * Constructor
     * @param passport        - passport
     * @param LocalStrategy   - local strategy
     * @constructor
     */
    function AuthenticationService(passport, LocalStrategy) {
        this.dbContext = new DbContext();
        this.initialize(passport, LocalStrategy);
    }

    /**
     *
     * @param passport
     * @param LocalStrategy
     */
    AuthenticationService.prototype.initialize = function (passport, LocalStrategy) {
        var self = this;
        /** register serializeUser **/
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        /** register de-serialize User **/
        passport.deserializeUser(function (id, next) {
            self.dbContext.userService.user.find(id).success(function (user) {
                next(null, user);
            });
        });
        /** Configure passport strategy **/
        passport.use(new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            function (email, password, done) {
                /** verify and login **/
                self.dbContext.userService.User.all({ where: { email: email} }, function(error, userValues) {
                    if(error){
                        return done(error);
                    }
                    if (bcrypt.compareSync(password, userValues[0].password)) {
                        return done(null, userValues[0]);
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            }
        ));
    };

    /**
     * MembershipFilters actions.
     * @param req - http request.
     * @param res - http response.
     * @param next - callback.
     */
    AuthenticationService.prototype.authorize = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.render('/account/login');
    };

    return AuthenticationService;
})();

/** Export the Class **/
module.exports = AuthenticationService;
