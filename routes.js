var express = require('express');
var router = express.Router();


router.use(function(req, res, next) {
	console.log('Tapahtuma');
	next();
});

router.get('/', function(req, res, next) {
	res.render('index');
});

module.exports = router;