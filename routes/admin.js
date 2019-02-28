var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const crypto = require('crypto');
const Admin = require('../model/admin.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (getCookie(req)) { renderIndex(res); }
  else { renderLogin(res); }
});

function renderLogin(res) {
  res.render('admin/login', {
    title: 'Admin',
  });
}
function renderIndex(res) {
  res.render('admin/index', {
    title: 'Admin',
  });
}



router.post('/login', function (req, res, next) {
  var admin = new Admin();
  var params = { 'username': req.body.username, 'password': crypto.createHash('sha1').update(req.body.password).digest('hex') };
  admin.checkLogin(params, function (err, response) {
    if (err === 200) {
      setCookie(res);
    }
    res.sendStatus(err);
  });
});
function getCookie(req) {
  // check if client sent cookie
  var cookie = req.cookies.adminLogin;
  return (cookie !== undefined);
}
function setCookie(res) {
  var randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  res.cookie('adminLogin', randomNumber, { maxAge: 3600000, httpOnly: true });
}

module.exports = router;
