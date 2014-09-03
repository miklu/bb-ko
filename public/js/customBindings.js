// Valuutoille
ko.bindingHandlers.valuutta = {
  update: function(elem, valueAccessor) {
    var luku = valueAccessor() || 0;
    var muotoiltu = luku.toFixed(2);
    $(elem).html('<span>' + muotoiltu + '€</span>');
  }
};

// Prosenteille
ko.bindingHandlers.prosentti = {
  update: function(elem, valueAccessor) {
    var luku = valueAccessor() * 100 || 0;
    var muotoiltu = luku.toFixed(0);
    $(elem).html('<span>' + muotoiltu + '%</span>');
  }
};