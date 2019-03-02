var db = require('./main/db');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const defaultQueryLogin = "SELECT nome, cognome, nome_display FROM users WHERE username = '{username}' and password = '{password}' and is_admin = 1;";

function setDefaultWhere(condition, limit = false) {
    return defaultQuery.replace("{where}", condition).replace("{limit}", limit ? ' LIMIT ' + limit : '');
}
class Admin {
    constructor() { }

    checkLogin(params, callback) {
        var query = defaultQueryLogin.replace("{username}", params.username).replace("{password}", params.password);
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

module.exports = Admin;