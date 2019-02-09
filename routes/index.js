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

function sendMailToTOTO(params) {
  // var telefono = '';
  // if (params.telefono !== undefined) {
  //   telefono = params.telefono;
  // }

  // var text = 'Da:\n'+ params.cognome + ' ' + params.nome + 
  //   '\n\nMessaggio: \n' + params.messaggio +
  //   '\n\Email: \n' + params.email + 
  //   '\n\nNumero di telefono da contattare:\n' + telefono;
  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'g.ricaldone14@gmail.com',
  //     pass: 'Reventon7'
  //   }
  // });
  // var mailOptions = {
  //   from: 'noreply@iviaggiditoto.com',
  //   to: 's.modica@nuovevacanze.it',
  //   subject: 'Nuovo messaggio su iviaggiditoto.com',
  //   text: text
  // };
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
}

router.get('/continente/form', function (req, res, next) {
  var app = express();
  app.set('view engine', 'jade');
  data = dateNowFormatted(0);

  logger.error(data);

  app.render('site/vacanze/crea_form', { data_da: dateNowFormatted(0), data_a: dateNowFormatted(14) }, function (err, html) {
    if (err) {
      logger.error(err);
    }
    res.send(html);
  });
});

function dateNowFormatted(days) {
  var d = new Date(Date.now());
  if (days !== 0) {
    d.setDate(d.getDate() + days);
  }
  var month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}



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