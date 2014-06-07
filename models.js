var mongoose = require('mongoose');

var Kohde = mongoose.Schema({
	ottelu: String
});

var VetoSchema = mongoose.Schema({
	pvm: {type: Date, default: Date.now},
	booker: String,
	pelimuoto: String,
	panos: Number,
	kerroin: Number,
	voitto: Number,
	kohteet: [Kohde]
}, {collection: 'vedot'});

var Veto = mongoose.model('Veto', VetoSchema);

module.exports = Veto;