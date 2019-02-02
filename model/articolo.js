var db = require('./main/db'); 
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; 
const defaultQuery = "SELECT a.`titolo`, a.`descrizione`, a.`image`, a.`url`, c.`nome` AS categoria, c.`url` AS categoria_url, c.`icon` AS categoria_icon, n.`nome` AS nazione_nome, n.`icon` AS nazione_icon, co.`nome` AS continente_nome, c.`icon` AS continente_icon FROM articoli a left JOIN categorie c ON c.id = a.categoria LEFT JOIN continenti co ON co.id = a.continente LEFT JOIN nazioni n ON n.id = a.nazione WHERE c.tipo = 'articolo' and c.visibile = 1 and a.visibile = 1 ORDER BY a.`ordine` DESC {limit}";

function setDefaultWhere(condition, limit=false) {
    return defaultQuery.replace("{where}", condition).replace("{limit}", limit ? ' LIMIT ' + limit : '');
} 
class Articolo {
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
    getLast(n_articoli, callback) {
        var query = setDefaultWhere('', n_articoli);
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

    getArticoloByID(id, callback) {
        var query = setDefaultWhere("AND a.id = '"+id+"'");
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                // Model con dati corretti                
                var articolo = results[0];
                callback(200, articolo);
            }
            else {
                callback(418, results);
            }
        });
    }

    getArticoloByURL(articoloURL, callback) {
        var query = setDefaultWhere("AND a.url = '"+articoloURL+"'");
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                var articolo = results[0];
                callback(200, articolo);
            }
            else {
                callback(418, results);
            }
        });
    }
};

module.exports = Articolo;