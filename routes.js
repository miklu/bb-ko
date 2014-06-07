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

		var tmp = new Veto({
			pelimuoto: "Pitkäveto",
			panos: 3.5,
			kerroin: 10.87,
			voitto: 0,
			kohteet: [
			{ottelu: "Milan-Manu"},
			{ottelu: "Jokerit-Kärpät"}
			]
		});

		tmp.save(function(err, doc) {
			if(err) {
				console.log(err);
				res.json({vedot: err});
			}
			else {
				console.log(doc);
				res.json({vedot: doc});
			}
		});

	});

router.get('/tilastot', function(req, res, next) {
	Veto.tilastot(function(err, docs) {
			res.json(docs);
	});
});


module.exports = router;