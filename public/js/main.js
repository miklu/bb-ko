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

		self.vedot = ko.observableArray();				// Vedot
		self.tilastot = ko.observableArray();			// Tilastot
		self.valittuKategoria = ko.observable();	// Pitää kirjaa valitusta kategoriasta
		self.valittuVeto = ko.observable(); 			// Klikattu/valittu veto

		// Tallennuslomake
		self.tallennusLomake = {pelimuoto: ko.observable(), panos: ko.observable(), voitto: ko.observable(), kerroin: ko.observable(), kohteet: ko.observableArray()};
		// Oletuksena lomakkeessa yksi kohde
		self.tallennusLomake.kohteet.push({ottelu: 'eka ottelu'});

		// Navigoi/Valitsee kategorian
		self.valitseKategoria = function(category) {
			self.valittuKategoria(category.nimi);
			self.valittuVeto(null);
			$.getJSON(category.url, self.vedot);
		};

		// Näytä vedon tiedot
		self.valitseVeto = function(veto) {
			self.valittuVeto(veto);
		};

		// Tallennus
		self.tallennaVeto = function() {
			$.post(self.baseUrl + 'vedot', new Veto(self.tallennusLomake.pelimuoto(), self.tallennusLomake.panos(), self.tallennusLomake.kerroin(), self.tallennusLomake.voitto(), self.tallennusLomake.kohteet()))
				.done(function(data) {

					// Lisätään palvelimen palauttama veto, jotta saadaan myös _id yms.
					self.vedot.push(data);
					
					// Tyhjennetään lomake
					self.haeTilastot();
					self.tallennusLomake.pelimuoto('');
					self.tallennusLomake.kohteet('');
					self.tallennusLomake.kohteet({ottelu: 'ekakohde'});
				});
		};

		// Lisää uuden kohteen lomakkeeseen
		self.lisaaKohde = function() {
			self.tallennusLomake.kohteet.push({ottelu: 'uusi kohde'});
		};

		// Poistaminen
		self.poistaVeto = function(veto) {
			$.ajax({
				type: 'DELETE',
				url: self.baseUrl + 'vedot/' + veto._id,
				success: function(data) {
					self.haeTilastot();
				}
			});
			self.vedot.remove(veto);
			self.valittuVeto(null);
		};

		// Tilastojen haku
		self.haeTilastot = function() {
			$.getJSON(self.baseUrl + 'tilastot', self.tilastot);
		};

		self.valitseKategoria(self.kategoriat[0]);	// Oletuksena näytetään kaikki vedot
		self.haeTilastot();													// Haetaan tilastot

	}; // End of ViewModel

	ko.applyBindings(new ViewModel());
	
})();