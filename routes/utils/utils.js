var fs = require('fs'); 
var db = require('../../model/main/db');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
class Utils {

    getViewByURL(route, url) {
        var path_file = './views/site/' + route + '/' + url + '.jade';
        logger.debug('VIEW: ' + path_file);
        if (fs.existsSync(path_file)) {
            return 'site/' + route + '/' + url;
        }
        else {
            return 'site/' + route + '/default';
        }   
    }
    getParametro(tipo, chiave, callback) {
        var query = "SELECT * FROM parametri WHERE tipo = {tipo} AND chiave = {chiave};".replace("{tipo}", tipo).replace("{chiave}", chiave);

        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                // Model con dati corretti
                callback(200, results);
            }
            else {
                callback(418, results);
            }
        });
    }
}

module.exports = Utils;