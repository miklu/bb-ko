var express = require('express');
var router = express.Router();
var Veto = require('../models.js');

router.use(function(req, res, next) {
  console.log('Tapahtuma');
  next();
});

// /tilastot -> Kaikki tilastot
router.get('/', function(req, res) {
  Veto.tilastot(function(err, docs) {
    if(err) {
      res.send(400, err.name + ':' + err.message);
    }
    else {
      res.json(docs);
    }
  });
});

// Tilastot pelimuodoittain
router.get('/:pelimuoto', function(req, res, next) {
  Veto.tilastotPelimuodoittain(req.params.pelimuoto, function(err, tilastot) {
    if(err) {
      res.send(400, err.name + ':' + err.message);
    }
    else {
      res.json(tilastot);
    }
  });
});

module.exports = router;