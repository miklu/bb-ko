(function() {
	'use strict';

	// Yksittäinen veto
	var Veto = function(pelimuoto, panos, kerroin, voitto, kohteet) {
		this.pelimuoto = pelimuoto;
		this.panos = panos;
		this.kerroin = kerroin;
		this.voitto = voitto;
		this.kohteet = kohteet;
	};

	// ViewModel
	var ViewModel = function() {
		var self = this;

		self.baseUrl = 'http://localhost:3000/';

		// Navigaatio
		self.kategoriat = [
		{nimi: 'Kaikki', url: self.baseUrl + 'vedot'},
		{nimi: 'Pitkävedot', url: self.baseUrl + 'pelimuoto/pitkäveto'},
		{nimi: 'Tulosvedot', url: self.baseUrl + 'pelimuoto/tulosveto'},
		{nimi: 'Monivedot', url: self.baseUrl + 'pelimuoto/moniveto'}];

		// Vedot
		self.vedot = ko.observable();

		// Pitää kirjaa valitusta kategoriasta
		self.valittuKategoria = ko.observable();
		// Valittu veto
		self.valittuVeto = ko.observable();

		// Navigoi/Valitsee kategorian
		self.valitseKategoria = function(category, event) {
			self.valittuKategoria(category.nimi);
			self.valittuVeto(null);
			$.getJSON(category.url, function(data) {
				self.vedot(data);
			});
			console.log(category.nimi + ', ' + category.url);
		};

		// Näytä vedon tiedot
		self.valitseVeto = function(veto) {
			self.valittuVeto(veto);
		};

		// Oletuksena näytetään kaikki vedot
		self.valitseKategoria(self.kategoriat[0]);

	}; // End of ViewModel

	ko.applyBindings(new ViewModel());
	
})();