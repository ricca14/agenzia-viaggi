var db = require('./main/db');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const defaultQuery = "SELECT * FROM categorie WHERE visibile = 1 {where} ORDER BY ordine";

function setDefaultWhere(condition) {
    return defaultQuery.replace("{where}", condition);
}
class Categoria {
    constructor() {}

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
    getCategoriaByID(id, callback) {
        var query = setDefaultWhere("AND id = '" + id + "'");
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                // Model con dati corretti                
                var categoria = results[0];
                callback(200, categoria);
            }
            else {
                callback(418, results);
            }
        });
    }

    getCategoriaByURL(categoriaURL, callback) {
        var query = setDefaultWhere("AND url = '" + categoriaURL + "'");
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                var categoria = results[0];
                callback(200, categoria);
            }
            else {
                callback(418, results);
            }
        });
    }
};

module.exports = Categoria;