/**
 * Created with IntelliJ IDEA.
 * User: Rajan
 * Date: 5/9/13
 * Time: 2:42 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Account controller class
 */
var AccountController = (function () {

    /**
     * Dependencies
     **/
    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');
    var UserService = require('../daos/UserDao');

    /**
     * Constructor.
     * @param app - express app.
     * @param UserService
     */
    function AccountController(UserService, app) {
        this.app = app;
        this.userService = UserService;
        this.actions(this.app);
    }

    /**
     * Home Controller actions.
     * @param app
     */
    AccountController.prototype.actions = function (app) {
        var self = this;
        /** GET call to login page **/
        app.get('/login', function (req, res) {
            res.render('account/login',  { title: 'Red Seal' });
        });

        /** Post call to login  **/
        app.post('/login', function (req, res, next) {
            /** Get the email and password from the request**/
            var email = req.param('email');
            var password = req.param('password');
            /** User service **/
            self.userService.findByEmail(email, function(err, userValues){
                /** If any unknown error **/
                if(err){
                   return next(err);
                }
                /** User does not exist **/
                if(userValues && userValues.length == 0){
                   return res.render('account/login', {error: "user-invalid"} );
                }
                /** if user exist then check the password  **/
                if(userValues && userValues.length > 0){
                    /** verify password **/
                    self.userService.verifyPassword(userValues[0], password, function(err, passwordCorrect){
                        if(passwordCorrect){
                            req.login(userValues[0], function(err){
                                if(err){
                                    return res.render('account/login',{error: "user-invalid"} );
                                }
                                return res.render('home/index');
                            });
                        }else{
                            return res.render('account/login',{error: "user-invalid"} );
                        }
                    });
                }
            });
        });

        /** Logout **/
        app.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });

        /** GET call to register **/
        app.get('/register', function (req, res) {
            res.render('account/register',  { title: 'Red Seal' });
        });

        /** POST call to register **/
        app.post('/register', function (req, res) {
            /** Get the email and password from the request**/
            var email = req.param('email');
            var pword = req.param('password');
            /** Check if the user already exist **/
            self.userService.findByEmail(email, function(err, userValues){
                /** User does not exist **/
                if(userValues && userValues.length == 0){
                    /** Encrypt the password **/
                    self.userService.addUser(email, pword, function(err, user){
                        if(user){
                            res.render('account/login',  { title: 'Login' });
                        } else {
                            /** TODO: need to send the values to the page using modal dialog**/
                            console.log('Something went wrong : ' + err);
                        }
                    });
                }
                /** User exist **/
                if(userValues && userValues.length > 0){
                    res.render('account/register', { error: "email-taken" });
                }
            });
        });
    };
    return AccountController;
})();

/** Expose the object **/
module.exports = AccountController;