/**
 * User: Rajan
 * Date: 5/9/13
 * Time: 2:42 PM
 */
/**
 * Home controller class
 */
var HomeController = (function () {

    /**
     * @param app - express app.
     **/
    function HomeController(app) {
        this.app = app;
        this.actions(this.app);
    }

    /**
     * Home Controller actions.
     * @param app
     */
    HomeController.prototype.actions = function (app) {
        //index
        app.get('/', function (req, res) {
            res.render('home/index',  { title: 'Red Seal' });
        });
    };

    return HomeController;
})();

/** Expose HomeController **/
module.exports = HomeController;