$(function() {
	ko.applyBindings(new ViewModel());
});


var ViewModel = function() {
	var self = this;
	self.kategoriat = ['Kaikki', 'Pitkäveto', 'Tulosveto', 'Moniveto', 'Voittajaveto'];
	self.valittuKategoria = ko.observable();
	self.kategorianVedot = ko.observable();
	self.vedonTiedot = ko.observable();

	// Navigointi
	self.siirry = function(kategoria) {
		self.valittuKategoria(kategoria);
		self.vedonTiedot(null);
		$.getJSON('http://localhost:3000/pelimuoto/' + kategoria, function(data) {
			self.kategorianVedot(data);
		});
	};

	self.naytaTiedot = function(veto) {
		self.valittuKategoria(veto.pelimuoto);
		$.getJSON('http://localhost:3000/vedot/' + veto._id, function(data) {
			self.vedonTiedot(data);
			self.kategorianVedot(null);
			console.log(self.vedonTiedot());
		});
	};

	// Oletuksena valittu
	self.siirry('Tulosveto');

};