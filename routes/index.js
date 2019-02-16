var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; // debug, info, warn, error

const Articolo = require('../model/articolo.js'); 
const Contacts = require('../model/contact.js'); 
const Vacanza = require('../model/vacanza.js');
const nodemailer = require("nodemailer");



/* GET home page. */
router.get('/', function (req, res, next) {
  var articolo = new Articolo();
  articolo.getLast(5, function (err, articoli) {
    res.render('site/index', {
      title: 'Home',
      route: 'Home',
      articoli: articoli
    });
  });
});

router.get('/chi_siamo', function (req, res, next) {
  res.render('site/chi_siamo', {
    title: 'Chi siamo',
    route: 'chi_siamo'
  });
});

router.get('/contattaci', function (req, res, next) {
  res.render('site/contattaci', {
    title: 'Contattaci',
    route: 'contattaci'
  });
});

router.get('/contattaci/info', function (req, res, next) {
  res.render('site/contattaci', {
    title: 'Contattaci',
    route: 'contattaci',
    msg: true,
  });
});

// AJAX
router.post('/contattaci', function (req, res, next) {
  var sms = new Contacts();
  sms.insertMessaggio(req.body, function (err, response) {
    if(err === 200) {
      sendMailToTOTO(req.body);
    }
    res.sendStatus(err);
  });
});

router.get('/continente/:continenteID', function (req, res, next) {
  var vacanze = new Vacanza();
  var continenteID = req.params.continenteID;
  vacanze.startCreaStepNazioni(continenteID, function (errore, nazioni) {
    if (errore != 200) {
      logger.error(errore)
      res.status(errore).end();
    }
    else {
      var app = express();
      app.set('view engine', 'jade');
      app.render('site/vacanze/crea_nazioni', { nazioni: nazioni }, function (err, html) {
        if (err) {
          logger.error(err);
        }
        res.send(html);
      });
    }
  });
});

module.exports = router;