var db = require('./main/db');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; 
const defaultQuery = "SELECT * from categorie WHERE visibile = 1 {where} ORDER BY ordine;";
const defaultVacanzeQuery = "SELECT v.*, n.`code`, n.`nome`, n.`icon`, c.`nome` AS categoria, c.`titolo` AS titolo_categoria, c.`descrizione` AS descrizione_categoria, c.`url` AS categoria_url, c.`icon` AS categoria_icon, c.`icon` AS contegoria_icon, n.`nome` AS nazione_nome, n.`icon` AS nazione_icon, t1.`nome` as t1_nome, t2.`nome` as t2_nome, t3.`nome` as t3_nome FROM vacanze v LEFT JOIN nazioni n ON n.`id` = v.`nazione` LEFT JOIN categorie c ON c.id = v.categoria LEFT JOIN alloggi a ON a.id = v.alloggio LEFT JOIN localita l ON l.id = v.localita LEFT JOIN tag t1 ON t1.id = v.tag_1 LEFT JOIN tag t2 ON t2.id = v.tag_2 LEFT JOIN tag t3 ON t3.id = v.tag_3 WHERE v.visibile = 1 AND c.visibile = 1 {where} ORDER BY v.`ordine` DESC {limit};";

function setDefaultWhere(condition, limit = false) {
    return defaultQuery.replace("{where}", condition).replace("{limit}", limit ? ' LIMIT ' + limit : '');
} 
function setVacanzeQueryWhere(condition, limit = false) {
    return defaultVacanzeQuery.replace("{where}", condition).replace("{limit}", limit ? ' LIMIT ' + limit : '');
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

    getVacanzeCategoriaByURL(categoriaURL, callback) {
        var query = setVacanzeQueryWhere("AND c.url = '" + categoriaURL + "'");
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

    getCategoriaDatail(categoriaURL, callback) {
        var query = setDefaultWhere("AND url = '" + categoriaURL + "'", 1);
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
};

module.exports = Categoria;