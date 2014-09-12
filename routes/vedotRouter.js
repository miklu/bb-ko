var express = require('express');
var router = express.Router();
var Veto = require('../models.js');

router.use(function(req, res, next) {
  console.log('Tapahtuma');
  next();
});

// Vedot API
router.route('/')
  
  // Kaikki vedot
  .get(function(req, res, next) {
    Veto.find({}).limit(50).sort({'pvm': 'descending'}).exec(function (err, docs) {     
      if(err) {
        console.log(err);
        res.send(400, err.name + ': ' + err.message);
      }
      
      else {
        res.json(docs);
      }
    });
  })
  // Vedon tallennus
  .post(function(req, res, next) {

    var veto = new Veto({
      booker: req.body.booker,
      pelimuoto: req.body.pelimuoto,
      panos: req.body.panos,
      voitto: req.body.voitto,
      kerroin: req.body.kerroin,
      kohteet: req.body.kohteet
    });

    veto.save(function(err, doc) {
      if(err) {
        console.log(err);
        res.send(400, err.name + ': ' + err.message);
      }
      else {
        console.log(doc);
        res.json(doc);
      }
    });

  });

// Vedot pelimuodon mukaan
router.route('/pelimuoto/:pelimuoto')
  .get(function(req, res, next) {
    
    Veto.find({pelimuoto: new RegExp('^'+req.params.pelimuoto+'$', "i")}, function(err, results) {
      
      if(err) {
        res.send(400, err.name + ': ' + err.message);
      }
      else {
        res.json(results);
      }
      
    });
  });


// Vedot id:n mukaan
router.route('/:id')
  .get(function(req, res, next) {
    Veto.findById(req.params.id, function(err, result) {

      if(err) {
        res.send(400, err.name + ': ' + err.message);
      }

      else {
        res.json(result);
      }
    });
  })
  .delete(function(req, res, next) {
    Veto.findByIdAndRemove(req.params.id, function(err, removed) {
      console.log(removed);
      res.json(removed);
    });
  })
  .put(function(req, res, next) {
    Veto.findById(req.params.id, function(err, result) {
      if(err) {
        res.send(400, err.name + ': ' + err.message);
      }
      else {
        result.booker = req.body.booker,
        result.pelimuoto = req.body.pelimuoto,
        result.panos = req.body.panos,
        result.kerroin = req.body.kerroin,
        result.voitto = req.body.voitto,
        result.kohteet = req.body.kohteet,

        result.save(function(err, saved) {

          if(err) {
            res.send(400, err.name + ': ' + err.message);
          }

          else {
            res.json(saved);
          }
        });
      }
    });
  });

module.exports = router;