var db = require('./main/db');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const insertQuery = "INSERT INTO `email_in` ({campi}, data_invio) VALUES ({valori}, now())";
const defaultQuery = "SELECT * from email_in WHERE {where} order by id desc limit {limit};";

function setDefaultWhere(condition, limit='50') {
    q = defaultQuery.replace("{where}", condition);
    q = q.replace("{limit}", limit);
    return q;
}
class Contacts {
    constructor() { }
    getAll(callback) {
        var query = setDefaultWhere('');
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
    getMessaggioByEmail(email, callback) {
        var query = setDefaultWhere("email = '" + email + "'");
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

    insertMessaggio(params, callback) {
        var campi = ""; var valori = "";
        for (var key in params) {
            if (key !== 'g-recaptcha-response') {
                // check if the property/key is defined in the object itself, not in parent
                if (campi !== "") { campi += ', '; }
                if (valori !== "") { valori += ', '; }
                campi += escape(key);
                valori += "'"+params[key]+"'";
            }
        }
        var query = insertQuery.replace("{campi}", campi).replace("{valori}", valori);
        db.executeQuery(query, function (err, results) {
            if (err) {
                callback(418, results);
            }
            else {
                callback(200, results);
            }
        });
    }
};

module.exports = Contacts;