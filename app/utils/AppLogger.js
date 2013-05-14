/**
 * Created with IntelliJ IDEA.
 * User: Rajan
 * Date: 5/10/13
 * Time: 12:59 PM
 * To change this template use File | Settings | File Templates.
 */
var winston = require('winston');

/** Define AppLogger **/
var AppLogger = new (winston.Logger)({

    transports: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: 'debug.log', json: false })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: 'debug.log', json: false })
    ],
    exitOnError: false
});

/** Expose **/
module.exports = AppLogger;