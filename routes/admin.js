var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin/index', {
    title: 'Admin',
  });
});

module.exports = router;
