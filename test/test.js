var request = require('supertest');
var should = require('should');
var app = require('../server.js');


describe('REST API', function() {

	var id;
	
	// Etusivu
	it('Etusivu', function(done) {
		request(app)
		.get('/')
		.expect('Content-Type', /html/)
		.expect(200)
		.end(function(err, res) {
			should.not.exist(err);
			done();
		});
	});

	// Kaikki vedot
	it('GET vedot', function(done) {
		request(app)
		.get('/vedot')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});


});