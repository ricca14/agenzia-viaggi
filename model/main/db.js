var mysql = require('mysql');
// TEST
// const credentials = { host: 'localhost', user: 'root', password: 'reventon7', database: 'agenzia_viaggi' };
// PROD
const credentials = { host: 'uf63wl4z2daq9dbb.chr7pe7iynqr.eu-west-1.rds.amazonaws.com', user: 'ko0glfci1sg9gt3b', password: 'pqik5yg6ixhvhiw2', database: 'hjj0cggwndc4657y' };

var log4js = require('log4js');
var logger = log4js.getLogger();
var db;
var exports = module.exports = {};

// Se non è presente crea una connessione al DB
function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(credentials);
        db.connect(function (err) {
            if (!err) {
                logger.info('Database is connected!');
            } else {
                logger.error('Error connecting database!');
                logger.error(err);
            }
        });
    }
    return db;
}

// Gli viene passata in ingresso una query e ritorna i risultati
exports.executeQuery = function (query, callback) {  
    var t0 = Date.now();
    db = connectDatabase();
    db.query(query, (err, rows) => {
        if (err) {
            logger.error(err);
            throw err;
        }
        // logger.debug('Data received from Db:\n', rows);
        var t1 = Date.now();
        var timeQuery = (t1 - t0);
        if (timeQuery > 50) {
            logger.warn(query);
            logger.warn("SLOW QUERY ALERT: " + timeQuery + " milliseconds.");
        }
        // db.end();
        callback(err, rows);
    });
};

