var express = require('express');
var router = express.Router();
var Veto = require('../models.js');

router.use(function(req, res, next) {
  console.log('Tapahtuma');
  next();
});

router.get('/', function(req, res) {
  res.send('Kaikki');
});

router.get('/:pelimuoto', function(req, res) {
  res.send(req.params.pelimuoto);
});

module.exports = router;