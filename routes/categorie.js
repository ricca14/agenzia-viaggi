var express = require('express');
var router = express.Router();

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const Categoria = require('../model/categoria.js');
const Utils = require('./utils/utils.js');
const utiliy = new Utils();
const route = 'categorie';

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
    categoria.getCategoriaByURL(categoriaUrl, function (err, articolo) {
        if (err == 418) {
            res.redirect('/categorie');
        }
        else {
            res.render(utiliy.getViewByURL(route, categoriaUrl), {
                title: articolo.nome,
                route: route,
                articolo: articolo
            });
        }
    });
});

module.exports = router;
