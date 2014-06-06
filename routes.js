var express = require('express');
var router = express.Router();

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
		res.json({vedot: "Kaikki vedot"});
	})
	// Vedon tallennus
	.post(function(req, res, next) {
		res.json({vedot: "Vedon tallennus"});
	});



module.exports = router;