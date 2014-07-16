(function() {
	'use strict';

	var Veto = function(pelimuoto, panos, kerroin, voitto, kohteet) {
		var self = this;
		self.pelimuoto = pelimuoto;
		self.panos = panos;
		self.kerroin = kerroin;
		self.voitto = voitto;
		self.kohteet = kohteet;
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
		self.vedot = ko.observableArray();

		// Pitää kirjaa valitusta kategoriasta
		self.valittuKategoria = ko.observable();

		// Valittu veto
		self.valittuVeto = ko.observable();

		// Tallennuslomake
		self.tallennusLomake = {pelimuoto: '', panos: '', voitto: '', kerroin: '', kohteet: ko.observableArray()};
		// Oletuksena lomakkeessa yksi kohde
		self.tallennusLomake.kohteet.push({ottelu: 'ottelusi'});

		// Navigoi/Valitsee kategorian
		self.valitseKategoria = function(category, event) {
			self.valittuKategoria(category.nimi);
			self.valittuVeto(null);
			$.getJSON(category.url, self.vedot);
			console.log(category.nimi + ', ' + category.url);
		};

		// Näytä vedon tiedot
		self.valitseVeto = function(veto) {
			self.valittuVeto(veto);
		};

		// Tallennus
		self.tallennaVeto = function() {
			$.post(self.baseUrl + 'vedot', new Veto(self.tallennusLomake.pelimuoto, self.tallennusLomake.panos, self.tallennusLomake.kerroin, self.tallennusLomake.voitto, self.tallennusLomake.kohteet()))
				.done(function(data) {
					// Lisätään palvelimen palauttama data, jotta saadaan myös _id
					self.vedot.push(data);
					// Tyhjennetään lomake
					self.tallennusLomake = {pelimuoto: '', panos: '', voitto: '', kerroin: '', kohteet: []};
				});
		};

		self.lisaaKohde = function() {
			self.tallennusLomake.kohteet.push({ottelu: 'uusi kohde'});
		};

		// Poisto
		self.poistaVeto = function(veto) {
			$.ajax({
				type: 'DELETE',
				url: self.baseUrl + 'vedot/' + veto._id,
				success: function(data) {
					console.log(data);
				}
			});
			self.vedot.remove(veto);
			self.valittuVeto(null);
		};

		// Oletuksena näytetään kaikki vedot
		self.valitseKategoria(self.kategoriat[0]);

	}; // End of ViewModel

	ko.applyBindings(new ViewModel());
	
})();