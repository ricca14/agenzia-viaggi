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

    insertAccesso(utente, pagina) {
        var query = "INSERT INTO `accessi` (`utente`, `pagina`) VALUES ('{utente}', '{pagina}')".replace('{utente}', utente).replace('{pagina}', pagina);
        db.executeQuery(query, function (err, results) {
            logger.warn('Accesso inserito');
        });
    }

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
    getAllContinenti(callback) {
        var query = 'select * from continenti order by ordine;';
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
    getContinente(id, callback) {
        var query = "SELECT * FROM continenti WHERE id = '"+id+"';";
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

    getAllNazioni(callback) {
        var query = 'select * from nazioni;';
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