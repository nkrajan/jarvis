var path = require('path');
/** Get passport dependencies **/
var passport = require('passport');

/*******************************************************************************
 * Application settings
 ******************************************************************************/
module.exports = function configure(express, dirname, app) {
    /** Set the environment variables **/
    app.set('port', 3000);
    app.set('views', dirname + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());

    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(dirname, 'app')));

    /** Set the app directory **/
    app.set('appDir', path.join(dirname, 'app'));
};