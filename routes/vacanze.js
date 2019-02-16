var express = require('express');
var router = express.Router();

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const Vacanza = require('../model/vacanza.js');
const Utils = require('./utils/utils.js'); 
const utiliy = new Utils();
const route = 'vacanze';
const browser = require('browser-detect');

// VIEW
router.get('/', function (req, res, next) {
    var imgExt = utiliy.getImageExtensionByBrowser(browser(req.headers['user-agent']));
    var vacanze = new Vacanza();
    vacanze.getAll(function (err, vacanze) {
        res.render('site/vacanze', {
            title: 'Vacanze',
            vacanze: vacanze,
            route: route,
            imgExt: imgExt
        });
    });
});

router.get('/crea', function (req, res, next) {
    var imgExt = utiliy.getImageExtensionByBrowser(browser(req.headers['user-agent']));
    var vacanze = new Vacanza();
    vacanze.startCreaStepContinenti(function (err, continenti) {
        logger.error(continenti);
        res.render(utiliy.getViewByURL(route, 'crea'), {
            title: 'Vacanze',
            route: route,
            continenti: continenti,
            nazioni: [],
            data_da: utiliy.dateNowFormatted(0), 
            data_a: utiliy.dateNowFormatted(14),
            imgExt: imgExt
        });
    });
});

router.get('/:vacanzaUrl', function (req, res, next) {
    var vacanzaUrl = req.params.vacanzaUrl;
    if (!vacanzaUrl) {
        logger.warn('No vacanzaUrl o parametro vuoto');
        res.redirect('/vacanze');
    }
    else {
        var imgExt = utiliy.getImageExtensionByBrowser(browser(req.headers['user-agent']));
        var vacanze = new Vacanza();
        vacanze.getVacanzaByURL(vacanzaUrl, function (err, vacanza) {
            if (err == 418) {
                res.redirect('/vacanze');
            }
            else {
                res.render(utiliy.getViewByURL(route, vacanzaUrl), {
                    title: vacanza.titolo,
                    vacanza: vacanza,
                    route: route,
                    imgExt: imgExt
                });
            }
        });
    }
});

router.post('/crea-vacanza', function (req, res, next) {
    var vacanze = new Vacanza();
    vacanze.insertVacanza(req.body, function (err, result) {
        res.sendStatus(err);
    });
});




module.exports = router;
