(function() {
  'use strict';

  // Kombinaatio
function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;
  
  if (k > set.length || k <= 0) {
    return [];
  }
  
  if (k == set.length) {
    return [set];
  }
  
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  
  // Assert {1 < k < set.length}
  
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

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
      {nimi: 'Pitkävedot', url: self.baseUrl + 'vedot/pelimuoto/pitkäveto', tilasto: '/tilastot/Pitkäveto'},
      {nimi: 'Tulosvedot', url: self.baseUrl + 'vedot/pelimuoto/tulosveto', tilasto: '/tilastot/Tulosveto'},
      {nimi: 'Monivedot', url: self.baseUrl + 'vedot/pelimuoto/moniveto', tilasto: '/tilastot/Moniveto'}];

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

    // Systeemit
    self.sys = ko.observable(2);

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

    self.tallennaSysteemi = function() {
      // console.log(self.sys());


      var kohteet = [
        {ottelu: 'Eka', kerroin: 2},
        {ottelu: 'Toka', kerroin: 4},
        {ottelu: 'Kolmas', kerroin: 6},
        {ottelu: 'Neljäs', kerroin: 8}
      ];


      var vedot = k_combinations(kohteet, self.sys());
      for(var i=0; i < vedot.length; i++) {
        var kerroin = 1;
        for(var j=0; j < vedot[i].length; j++) {
          console.log(vedot[i][j].ottelu);
          kerroin *= vedot[i][j].kerroin;
        }
        console.log(kerroin);
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