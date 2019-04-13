var express = require('express');
var router = express.Router();

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


    // GESTIONE SINGOLA CATEGORIA SE ARTICOLO


    // Prendo tutte le vacanze per una determinata categoria
    categoria.getCategoriaByURL(categoriaUrl, function (err, vacanze) {
        if (err == 418) {
            res.redirect('/categorie');
        }
        else {
            switch (categoriaUrl) {
                case 'last-minute':
                    title = 'Vacanze - LAST MINUTE';
                    break;
                case 'mood':
                    title = 'Vacanze - MOOD';
                    break; 
                default:
                    title = '';
                    break;
            }
            var imgExt = utiliy.getImageExtensionByBrowser(browser(req.headers['user-agent']));
            res.render(utiliy.getViewByURL(route, categoriaUrl), {
                title: vacanze.nome,
                route: route,
                elelement: vacanze,
                type: 'vacanze',
                intro: categoriaUrl,
                imgExt: imgExt
            });
        }
    });
});

module.exports = router;
