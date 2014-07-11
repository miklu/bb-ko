var express = require('express');
var router = express.Router();
var Veto = require('./models.js');

 // Middleware kaikkiin reitteihin
router.use(function(req, res, next) {
	console.log('Tapahtuma');
	next();
});

// Etusivu
router.get('/', function(req, res, next) {
	res.render('index');
});

// Vedot API
router.route('/vedot')
	
	// Kaikki vedot
	.get(function(req, res, next) {
		Veto.haeKaikki(function(err, docs) {
			
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

		var tmp = new Veto({
			pelimuoto: req.body.pelimuoto,
			panos: req.body.panos,
			voitto: req.body.voitto,
			kerroin: req.body.kerroin,
			kohteet: req.body.kohteet
		});

		tmp.save(function(err, doc) {
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
		if(req.params.pelimuoto.toLowerCase() === 'kaikki') {
			Veto.haeKaikki(function(err, docs) {
			
			if(err) {
				console.log(err);
				res.send(400, err.name + ': ' + err.message);
			}
			
			else {
				res.json(docs);
			}
		});
		}
		Veto.find({pelimuoto: new RegExp('^'+req.params.pelimuoto+'$', "i")}, function(err, results) {
			res.json(results);
		});
	});


// Vedot id:n mukaan
router.route('/vedot/:id')
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
		});
	})
	.put(function(req, res, next) {
		Veto.findById(req.params.id, function(err, result) {
			if(err) {
				res.send(400, err.name + ': ' + err.message);
			}
			else {
				result.pvm = req.body.pvm,
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

// Tilastot
router.get('/tilastot', function(req, res, next) {
	Veto.tilastot(function(err, docs) {
		
		if(err) {
			res.send(400, err.name + ': ' + err.message);
		}
		else {
			res.json(docs);
		}

	});
});


module.exports = router;