
var express = require('express');
var path = require('path');
var routes = require('./routes.js');
var testi = require('./routes/tilastotRouter.js');
var mongoose = require('mongoose');
var logger = require('morgan');
var favicon = require('static-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ejs = require('ejs');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(favicon());
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());


mongoose.connect('mongodb://localhost/dev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Virhe yhdistäessä tietokantaan'));
db.once('open', function() {
	console.log('Yhdistetty tietokantaan');
});


app.use('/', routes);
app.use('/testi', testi);
app.listen(app.get('port'));
console.log('Kuunnellaan porttia ' + app.get('port'));

module.exports = app;