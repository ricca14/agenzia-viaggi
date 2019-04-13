var db = require('./main/db');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const insertVacanzaQuery = "INSERT INTO `richiesta_vacanza` ({campi}, data_richiesta) VALUES ({valori}, now())";
const defaultQuery = "SELECT v.*, n.`code`, n.`nome`, n.`icon`, c.`nome` AS categoria, c.`url` AS categoria_url, c.`icon` AS categoria_icon, c.`icon` AS contegoria_icon, n.`nome` AS nazione_nome, n.`icon` AS nazione_icon, t1.`nome` as t1_nome, t2.`nome` as t2_nome, t3.`nome` as t3_nome FROM vacanze v LEFT JOIN nazioni n ON n.`id` = v.`nazione` LEFT JOIN categorie c ON c.id = v.categoria LEFT JOIN alloggi a ON a.id = v.alloggio LEFT JOIN localita l ON l.id = v.localita LEFT JOIN tag t1 ON t1.id = v.tag_1 LEFT JOIN tag t2 ON t2.id = v.tag_2 LEFT JOIN tag t3 ON t3.id = v.tag_3 WHERE v.visibile = 1 AND c.visibile = 1 {where} ORDER BY v.`ordine` DESC {limit};";
function setDefaultWhere(condition, limit=false) {
    return defaultQuery.replace("{where}", condition).replace("{limit}", limit ? ' LIMIT ' + limit : '');
} 
class Vacanza {
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

    getLast(n_vacanze, callback) {
        var query = setDefaultWhere('', n_vacanze);
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

    getVacanzaByURL(vacanzaURL, callback) {
        var query = setDefaultWhere("AND v.url = '" + vacanzaURL + "'", 1);
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                var vacanza = results[0];
                callback(200, vacanza);
            }
            else {
                callback(418, results);
            }
        });
    }

    getLastMinute(callback) {
        var query = setDefaultWhere("AND c.nome = 'Last Minute'");
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                var vacanza = results[0];
                callback(200, vacanza);
            }
            else {
                callback(418, results);
            }
        });
    }

    startCreaStepContinenti(callback) {
        var query = "select id, nome, icon, img from continenti where visibile = 1 order by ordine asc;";
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                callback(200, results);
            }
            else {
                callback(418, results);
            }
        });
    }
    startCreaStepNazioni(continenteId, callback) {
        var query = "select * from nazioni where continente = {continente} and evidenza = 1 order by ordine asc;";
        query = query.replace("{continente}", continenteId);
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                callback(200, results);
            }
            else {
                if (err) {
                    logger.error(err);
                }
                if (results.length === 0) {
                    logger.error(query + ' - NO DATA REUTRNED');
                }
                callback(418, results);
            }
        });
    }

    insertVacanza(params, callback) {
        var campi = ""; var valori = "";
        for (var key in params) {
            if (key !== 'g-recaptcha-response') {
                // check if the property/key is defined in the object itself, not in parent
                if (campi !== "") { campi += ', '; }
                if (valori !== "") { valori += ', '; }
                campi += escape(key);
                valori += "'" + params[key] + "'";
            }
        }
        var query = insertVacanzaQuery.replace("{campi}", campi).replace("{valori}", valori);
        db.executeQuery(query, function (err, results) {
            callback(getErroceCodeByERR(err), results);
        });
    }
}

function getErroceCodeByERR(err) {
    if (err) { return 418; }
    else { return 200; }
}

module.exports = Vacanza;