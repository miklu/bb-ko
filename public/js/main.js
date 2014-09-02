(function() {
  'use strict';

  ko.bindingHandlers.valuutta = {
    update: function(elem, valueAccessor) {
      var luku = valueAccessor() || 0;
      var muotoiltu = luku.toFixed(2);
      $(elem).html('<span>' + muotoiltu + '€</span>');
    }
  };

  ko.bindingHandlers.prosentti = {
    update: function(elem, valueAccessor) {
      var luku = valueAccessor() * 100 || 0;
      var muotoiltu = luku.toFixed(0);
      $(elem).html('<span>' + muotoiltu + '%</span>');
    }
  };

  var Veto = function(pelimuoto, panos, kerroin, voitto, kohteet) {
    var self = this;
    self.pelimuoto = pelimuoto;
    self.panos = panos;
    self.kerroin = kerroin;
    self.voitto = voitto;
    self.kohteet = kohteet;
  };

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "300",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

  // ViewModel
  var ViewModel = function() {
    var self = this;

    self.baseUrl = 'http://localhost:3000/';

    // Navigaatio
    self.kategoriat = [
      {nimi: 'Kaikki', url: self.baseUrl + 'vedot', tilasto: '/tilastot'},
      {nimi: 'Pitkävedot', url: self.baseUrl + 'pelimuoto/pitkäveto', tilasto: '/tilastot/Pitkäveto'},
      {nimi: 'Tulosvedot', url: self.baseUrl + 'pelimuoto/tulosveto', tilasto: '/tilastot/Tulosveto'},
      {nimi: 'Monivedot', url: self.baseUrl + 'pelimuoto/moniveto', tilasto: '/tilastot/Moniveto'}];

    // Data
    self.vedot = ko.observableArray();        // Vedot
    self.tilastot = ko.observableArray();     // Tilastot
    self.valittuKategoria = ko.observable();  // Pitää kirjaa valitusta kategoriasta
    self.valittuVeto = ko.observable();       // Klikattu/valittu veto
    self.muokattavaVeto = ko.observable();

    // Tallennuslomake
    self.tallennusLomake = {pelimuoto: ko.observable(), panos: ko.observable(), voitto: ko.observable(), kerroin: ko.observable(), kohteet: ko.observableArray()};
    self.tallennusLomake.isVisible = ko.observable(false);  // Onko näkyvä
    self.tallennusLomake.isNew = ko.observable(false);      // Luodaanko uusi veto vai muokataanko

    // Oletuksena lomakkeessa yksi kohde
    self.tallennusLomake.kohteet.push({ottelu: 'eka ottelu'});

    // Navigoi/Valitsee kategorian
    self.valitseKategoria = function(category) {
      self.valittuKategoria(category.nimi);
      self.valittuVeto(null);
      self.tallennusLomake.isVisible(false);
      $.getJSON(category.url, self.vedot);
      $.getJSON(category.tilasto, self.tilastot);
    };

    // Näytä vedon tiedot
    self.valitseVeto = function(veto, event) {
      console.log(event.target.tagName);
      if(event.target.tagName == 'TD') {
        self.valittuVeto(veto);
        self.tallennusLomake.isVisible(false);
      }
    };

    // Tuo vetolomakkeen näkyville
    self.aloitaTallennus = function() {
      self.tallennusLomake.isVisible(true);
      self.tallennusLomake.isNew(true);
    };

    // Tallennus
    self.tallennaVeto = function() {

      // Uusi veto
      if(self.tallennusLomake.isNew()) {
        $.post(self.baseUrl + 'vedot', new Veto(self.tallennusLomake.pelimuoto(), self.tallennusLomake.panos(), self.tallennusLomake.kerroin(), self.tallennusLomake.voitto(), self.tallennusLomake.kohteet()))
          .done(function(data) {

            // Lisätään palvelimen palauttama veto, jotta saadaan myös _id yms.
            self.vedot.push(data);
            
            self.haeTilastot();
            self.valitseKategoria(self.kategoriat[0]);
            toastr.success('Veto tallennettu');

            // Tyhjennetään lomake
            self.tyhjennaLomake();
          });
      }

      // Vedon muokkaus
      else {
        console.log('Ei ole uusi veto' + self.muokattavaVeto()._id);
        self.tallennusLomake.kohteet().forEach(function(elem) {
          if(elem.ottelu === "") {
            self.tallennusLomake.kohteet.remove(elem);
          }
        });
        var veto = new Veto(self.tallennusLomake.pelimuoto(), self.tallennusLomake.panos(), self.tallennusLomake.kerroin(), self.tallennusLomake.voitto(), self.tallennusLomake.kohteet());
        $.ajax({
          type: 'PUT',
          url: self.baseUrl + 'vedot/' + self.muokattavaVeto()._id,
          data: veto,
          success: function(data) {
            self.haeTilastot();
            self.valitseKategoria(self.kategoriat[0]);
            self.tyhjennaLomake();
            toastr.success('Vetoa muokattu!');
          }
        });
      }
    };

    // Lisää uuden kohteen lomakkeeseen
    self.lisaaKohde = function() {
      self.tallennusLomake.kohteet.push({ottelu: 'uusi kohde'});
    };

    // Muokkaus
    self.muokkaa = function(veto) {
      self.tallennusLomake.isNew(false);
      self.valittuVeto(null);
      self.muokattavaVeto(veto);
      self.tallennusLomake.pelimuoto(veto.pelimuoto);
      self.tallennusLomake.panos(veto.panos);
      self.tallennusLomake.kerroin(veto.kerroin);
      self.tallennusLomake.voitto(veto.voitto);
      self.tallennusLomake.kohteet(veto.kohteet);
      self.tallennusLomake.isVisible(true);
    };

    // Poistaminen
    self.poistaVeto = function(veto) {
      $.ajax({
        type: 'DELETE',
        url: self.baseUrl + 'vedot/' + veto._id,
        success: function(data) {
          self.haeTilastot();
          toastr.success('Veto poistettu');
        }
      });
      self.vedot.remove(veto);
      self.valittuVeto(null);
    };

    // Tilastojen haku
    self.haeTilastot = function() {
      $.getJSON(self.baseUrl + 'tilastot', self.tilastot);
    };

    // Tallennuslomakkeen tyhjennys
    self.tyhjennaLomake = function() {
      self.tallennusLomake.isVisible(false);
      self.tallennusLomake.pelimuoto('');
      self.tallennusLomake.panos('');
      self.tallennusLomake.kerroin('');
      self.tallennusLomake.voitto('');
      self.tallennusLomake.kohteet('');
      self.tallennusLomake.kohteet({ottelu: 'ekakohde'});
    };

    self.valitseKategoria(self.kategoriat[0]);  // Oletuksena näytetään kaikki vedot
    self.haeTilastot();                         // Haetaan tilastot

  }; // End of ViewModel

  ko.applyBindings(new ViewModel());

  
})();