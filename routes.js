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
			res.json(docs);
		});
	})
	// Vedon tallennus
	.post(function(req, res, next) {

		// TODO, ainoastaan esimerkki
		var tmp = new Veto({
			pelimuoto: req.body.pelimuoto,
			// panos: 4,
			voitto: 0
		});

		tmp.save(function(err, doc) {
			if(err) {
				console.log(err);
				res.send(400, err.name + ': ' + err.message);
			}
			else {
				console.log(doc);
			}
		});

	});

// Vedot id:n mukaan
router.route('/vedot/:id')
	.get(function(req, res, next) {
		Veto.findById(req.params.id, function(err, result) {
			res.json(result);
		});
	})
	.put(function(req, res, next) {
		Veto.findById(req.params.id, function(err, result) {
			if(err) {
				res.json({msg: 'Muokattavaa vetoa ei löydy'});
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
						res.json({msg: 'Muokattavan vedon tallennus ei onnistunut'});
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
			res.json(docs);
	});
});


module.exports = router;