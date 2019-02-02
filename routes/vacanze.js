var express = require('express');
var router = express.Router();

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const Vacanza = require('../model/vacanza.js');
const Utils = require('./utils/utils.js'); 
const utiliy = new Utils();
const route = 'vacanze';

// VIEW
router.get('/', function (req, res, next) {
    var vacanze = new Vacanza();
    vacanze.getAll(function (err, vacanze) {
        res.render('site/vacanze', {
            title: 'Vacanze',
            vacanze: vacanze,
            route: route
        });
    });
});

router.get('/crea', function (req, res, next) {
    var vacanze = new Vacanza();
    vacanze.startCreaStepContinenti(function (err, continenti) {
        logger.error(continenti)
        res.render(utiliy.getViewByURL(route, 'crea'), {
            title: 'Vacanze',
            route: route,
            continenti: continenti,
            nazioni: [],
        });
    });
});

router.get('/:vacanzaUrl', function (req, res, next) {
    var vacanzaUrl = req.params.vacanzaUrl;
    if (!vacanzaUrl) {
        logger.warn('No vacanzaUrl o parametro vuoto');
        res.redirect('/vacanze');
    }
    var vacanze = new Vacanza();
    vacanze.getVacanzaByURL(vacanzaUrl, function (err, vacanza) {
        if (err == 418) {
            res.redirect('/vacanze');
        }
        else {
            res.render(utiliy.getViewByURL(route, vacanzaUrl), {
                title: vacanza.titolo,
                vacanza: vacanza,
                route: route
            });
        }
    });
});

module.exports = router;
