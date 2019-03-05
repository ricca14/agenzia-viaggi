var express = require('express');
var router = express.Router();
const crypto = require('crypto');

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug'; 
var multer = require('multer');
var upload = multer({ dest: '/img/continenti' });

const Admin = require('../model/admin.js');
const admin = new Admin();
const Utils = require('./utils/utils.js');
const utiliy = new Utils();
var nome_utente = '';
var section = '';

/* GET users listing. */
router.get('/', function (req, res, next) {
  nome_utente = getCookie(req);
  if (nome_utente) { 
    admin.insertAccesso(nome_utente, 'index');
    renderIndex(res, nome_utente); }
  else { renderLogin(res); }
});
router.get('/:section/:id', function (req, res, next) {
  nome_utente = getCookie(req);
  if (nome_utente) {
    admin.insertAccesso(nome_utente, section);
    section = req.params.section;
    var id = req.params.id;
    switch (section) {
      case 'localita':
        renderModificaLocalita(res, id);
        break;
      case 'vacanze':
        renderModificaVacanze(res, id);
        break;
      case 'alloggi':
        renderModificaAlloggi(res, id);
        break;
      case 'categorie':
        renderModificaCategorie(res, id);
        break;
      case 'continenti':
        renderModificaContinenti(res, id);
        break;
      case 'nazioni':
        renderModificaNazioni(res, id);
        break;
      case 'tag':
        renderModificaTag(res, id);
        break;
      case 'immagini':
        renderModificaImmagini(res, id);
        break;
      default:
        renderIndex(res);
    }
  }
  else { renderLogin(res); }
});

function renderModificaContinenti(res, id) {
  admin.getContinente(id, function(err, continente) {
    res.render(utiliy.getAdminViewByURL('modifica_'+section), {
      section: section,
      nome_utente: nome_utente,
      continente: continente
    });
  });
}


// MAIN ROUTE
router.get('/:section', function (req, res, next) {
  nome_utente = getCookie(req);
  if (nome_utente) {
    section = req.params.section;
    admin.insertAccesso(nome_utente, section);
    switch (section) {
      case 'localita':
        renderLocalita(res);
        break;
      case 'vacanze':
        renderVacanze(res);
        break; 
      case 'alloggi':
        renderAlloggi(res);
        break; 
      case 'categorie':
        renderCategorie(res);
        break; 
      case 'continenti':
        renderContinenti(res);
        break; 
      case 'nazioni':
        renderNazioni(res);
        break; 
      case 'tag':
        renderTag(res);
        break;
      case 'immagini':
        renderImmagini(res);
        break;
      default:
        renderIndex(res);
    }
  }
  else { renderLogin(res); }
});

// EVERYBODY ROUTE
function renderLogin(res) {
  res.render(utiliy.getAdminViewByURL('login'), {
    section: 'home'
  });
}
function renderIndex(res) {
  res.render(utiliy.getAdminViewByURL('index'), {
    section: 'home',
    nome_utente: nome_utente
  });
}
function renderLocalita(res) {
  res.render(utiliy.getAdminViewByURL(section), {
    section: section,
    nome_utente: nome_utente
  });
}
function renderVacanze(res) {
  res.render(utiliy.getAdminViewByURL(section), {
    section: section,
    nome_utente: nome_utente
  });
}
function renderAlloggi(res) {
  res.render(utiliy.getAdminViewByURL(section), {
    section: section,
    nome_utente: nome_utente
  });
}
function renderCategorie(res) {
  res.render(utiliy.getAdminViewByURL(section), {
    title: 'Admin',
    section: section,
    nome_utente: nome_utente
  });
}
function renderContinenti(res) {
  admin.getAllContinenti(function (err, continenti) {
    res.render(utiliy.getAdminViewByURL(section), {
      section: section,
      nome_utente: nome_utente,
      continenti: continenti
    });
  });
}
function renderNazioni(res) {
  admin.getAllNazioni(function (err, nazioni) {
    res.render(utiliy.getAdminViewByURL(section), {
      section: section,
      nome_utente: nome_utente,
      nazioni: nazioni
    });
  });
}
function renderTag(res) {
  res.render(utiliy.getAdminViewByURL(section), {
    section: section,
    nome_utente: nome_utente
  });
}
function renderImmagini(res) {
  res.render(utiliy.getAdminViewByURL(section), {
    section: section,
    nome_utente: nome_utente
  });
}








// POST
router.post('/continente', function (req, res, next) {
  logger.error('\n WOW');
  logger.error(req.file);
  logger.error(req.body);
});


router.post('/login', function (req, res, next) {
  var admin = new Admin();
  var params = { 'username': req.body.username, 'password': crypto.createHash('sha1').update(req.body.password).digest('hex') };
  admin.checkLogin(params, function (err, result) {
    if (err === 200) {
      setCookie(res, result);
    }
    res.sendStatus(err);
  });
});
function getCookie(req) {
  // check if client sent cookie
  var cookie = req.cookies.adminLogin;
  if (cookie !== undefined) { return cookie; }
  else { return undefined; }
}
function setCookie(res, result) {
  nome_utente = result[0].nome_display;
  // setto tempo expires a 15gg (3600000 sec = 1 ora)
  expires = 3600000 * 24 * 15; 
  res.cookie('adminLogin', nome_utente, { maxAge: expires, httpOnly: true });
}
module.exports = router;
