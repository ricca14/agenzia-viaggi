var db = require('./main/db');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const insertVacanzaQuery = "INSERT INTO `richiesta_vacanza` ({campi}, data_richiesta) VALUES ({valori}, now())";
const defaultQuery = "SELECT v.*, n.`code`, n.`nome`, n.`icon`, c.`nome` AS categoria, c.`url` AS categoria_url, c.`icon` AS categoria_icon, n.`nome` AS nazione_nome, n.`icon` AS nazione_icon, co.`nome` AS continente_nome, c.`icon` AS continente_icon FROM vacanze v left join nazioni n on n.`id` = v.`nazione` left join continenti co on co.`id` = v.`continente` left join categorie c on c.id = v.categoria WHERE v.visibile = 1 and c.visibile = 1 {where} ORDER BY v.`ordine` DESC {limit};";
function setDefaultWhere(condition, limit=false) {
    return defaultQuery.replace("{where}", condition).replace("{limit}", limit ? ' LIMIT ' + limit : '');
} 
class Vacanza {
    constructor() { }

    getAll(callback) {
        var query = setDefaultWhere('');
        db.executeQuery(query, function (err, results) {
            callback(getErroceCodeByResult(query, results), results);
        });
    }

    getLast(callback) {
        var query = setDefaultWhere('', 12);
        db.executeQuery(query, function (err, results) {
            callback(getErroceCodeByResult(query, results), results);
        });
    }

    getVacanzaByID(id, callback) {
        var query = setDefaultWhere("AND a.id = '" + id + "'", 1);
        db.executeQuery(query, function (err, results) {
            if (typeof results !== 'undefined' && results.length > 0) {
                // Model con dati corretti                
                var vacanza = results[0];
                callback(200, vacanza);
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

    startCreaStepContinenti(callback) {
        var query = "select id, nome, icon, img from continenti where visibile = 1 order by ordine asc;";
        db.executeQuery(query, function (err, results) {
            callback(getErroceCodeByResult(query, results), results);
        });
    }
    startCreaStepNazioni(continenteId, callback) {
        var query = "select * from nazioni where continente = {continente} and evidenza = 1 order by ordine asc;";
        query = query.replace("{continente}", continenteId);
        db.executeQuery(query, function (err, results) {
            callback(getErroceCodeByResult(query, results), results);
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

function getErroceCodeByResult(query, result) {
    if (typeof results !== 'undefined' && results.length > 0) { return 200; }
    else {
        logger.error(query + ' - NO DATA REUTRNED');
        return 418;
    }
}
function getErroceCodeByERR(err) {
    if (err) { return 418; }
    else { return 200; }
}

module.exports = Vacanza;