var express = require('express');
var router = express.Router();

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const Articolo = require('../model/articolo.js');
const Utils = require('./utils/utils.js');
const utiliy = new Utils();
const route = 'articoli'; 
const browser = require('browser-detect');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var articolo = new Articolo();
    articolo.getAll(function (err, articoli) {
        res.render('site/articoli', {
            title: 'Articoli',
            route: route,
            articoli: articoli
        });
    });
});

router.get('/:articoloUrl', function (req, res, next) {
    var articoloUrl = req.params.articoloUrl;
    if (!articoloUrl) {
        logger.warn('No articoloUrl o parametro vuoto');
        res.redirect('/articoli');
    }
    var articolo = new Articolo();
    articolo.getArticoloByURL(articoloUrl, function (err, articolo) {
        if (err == 418) {
            res.redirect('/articoli');
        } 
        else {
            var imgExt = utiliy.getImageExtensionByBrowser(browser(req.headers['user-agent']));
            res.render(utiliy.getViewByURL(route, articoloUrl), {
                title: articolo.titolo,
                route: route,
                articolo: articolo,
                imgExt: imgExt,
                wip: false
            });
        }
    });
});

module.exports = router;
