var mongoose = require('mongoose');

var Kohde = mongoose.Schema({
	ottelu: String
});

var VetoSchema = mongoose.Schema({
	pvm: {type: Date, default: Date.now},
	pelimuoto: String,
	panos: {type: Number, required: true},
	kerroin: Number,
	voitto: {type: Number, required: true},
	kohteet: [Kohde]
}, {collection: 'vedot'});

VetoSchema.statics.haeKaikki = function(cb) {
	return this.find({}, cb);
};

VetoSchema.statics.haePelimuoto = function(pelimuoto, cb) {
	return this.find({pelimuoto: pelimuoto}, cb);
};

VetoSchema.statics.tilastot = function(cb) {
	return this.aggregate({$match: {panos: {$gte: 3}}}).exec(cb);
};

var Veto = mongoose.model('Veto', VetoSchema);

module.exports = Veto;