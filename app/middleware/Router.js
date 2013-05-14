/**
 * Routing class
 **/
var Router  = (function () {

    /**
     * Modules dependencies.
     */
    var HomeController = require('../controllers/HomeController');
    var AccountController = require('../controllers/AccountController');
    var AppLogger = require('../utils/AppLogger');

    /**
     * @param app - express app.
     */
    function Routing(dbContext, app) {
        this.registerRoutes(dbContext, app);
        this.registerApiRoutes(dbContext, app);
    }


    /**
     * Router actions.
     * @param dbContext
     * @param app
     */
    Routing.prototype.registerRoutes = function (dbContext, app) {
        var homeController = new HomeController(app);
        var accountController = new AccountController(dbContext.getUserDao(), app);
    };

    /**
     * API Router.
     * @param app
     */
    Routing.prototype.registerApiRoutes = function (app) {

    };

    return Routing;
})();

module.exports = Router;