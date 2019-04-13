var express = require('express');
var router = express.Router();
var async = require("async");

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const Categoria = require('../model/categoria.js');
const Utils = require('./utils/utils.js');
const utiliy = new Utils();
const route = 'categorie';
const browser = require('browser-detect');


/* GET users listing. */
router.get('/', function (req, res, next) {
    var categoria = new Categoria();
    categoria.getAll(function (err, categorie) {
        res.render('site/categorie', {
            title: 'Categorie',
            route: route,
            categorie: categorie
        });
    });
});

router.get('/:categoriaUrl', function (req, res, next) {
    var categoriaUrl = req.params.categoriaUrl;
    if (!categoriaUrl) {
        logger.warn('No categoriaUrl o parametro vuoto');
        res.redirect('/categorie');
    }
    var categoria = new Categoria();
    async.parallel({
        categoria: function (callback) {
            categoria.getCategoriaDatail(categoriaUrl, function (err, cat) {
                callback(null, cat);
            });
        },
        elements: function (callback) {

            // TODO: GESTIONE SINGOLA CATEGORIA SE ARTICOLO

            categoria.getVacanzeCategoriaByURL(categoriaUrl, function (err, vacanze) {
                if (err == 418) {
                    res.redirect('/categorie');
                }
                else {
                    callback(null, vacanze);
                }
            });
        },
    }, function (err, results) {
        var imgExt = utiliy.getImageExtensionByBrowser(browser(req.headers['user-agent']));
            var categoria = results.categoria[0];

            categoria.descrizione = categoria.descrizione.split("\n");

            logger.error(categoria.descrizione);

        res.render(utiliy.getViewByURL(route, categoriaUrl), {
            title: categoria.nome,
            categoria: categoria,
            route: route,
            element: results.elements,
            type: 'vacanze',
            intro: categoriaUrl,
            imgExt: imgExt
        });
    });
});

module.exports = router;
