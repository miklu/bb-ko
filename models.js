var mongoose = require('mongoose');

var Kohde = mongoose.Schema({
	liiga: String,
	ottelu: String,
	tyyppi: String,
	veikkaus: String,
	kerroin: Number,
	tulos: String,
	osuma: Boolean
});

var VetoSchema = mongoose.Schema({
	pvm: {type: Date, default: Date.now},
	booker: String,
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
	return this.aggregate({
		$group: {
			_id: "overall",
			kpl: {$sum: 1},
			avgPanos: {$avg: '$panos'},
			panoksetYht: {$sum: '$panos'},
			voitotYht: {$sum: '$voitto'},
			voitotKpl: {$sum: {$cond:[{$gt:['$voitto', 0]}, 1, 0]}}
		}},
		{
			$project: {
				kpl: 1,
				avgPanos: 1,
				panoksetYht: 1,
				voitotYht: 1,
				voitotKpl: 1,
				osumisprosentti: {$divide: ['$voitotKpl', '$kpl']},
				palautusprosentti: {$divide: ['$voitotYht', '$panoksetYht']},
				saldo: {$subtract: ['$voitotYht', '$panoksetYht']}
		}
	}).exec(cb);
};

VetoSchema.statics.tilastotPelimuodoittain = function(pelimuoto, cb) {
	return this.aggregate({
		$match: {pelimuoto: pelimuoto}
	},
	{
		$group: {
			_id: 'pelimuodon_mukaan',
			kpl: {$sum: 1},
			avgPanos: {$avg: '$panos'},
			panoksetYht: {$sum: '$panos'},
			voitotYht: {$sum: '$voitto'},
			voitotKpl: {$sum: {$cond:[{$gt:['$voitto', 0]}, 1, 0]}}
		}},
		{
			$project: {
				kpl: 1,
				avgPanos: 1,
				panoksetYht: 1,
				voitotYht: 1,
				voitotKpl: 1,
				osumisprosentti: {$divide: ['$voitotKpl', '$kpl']},
				palautusprosentti: {$divide: ['$voitotYht', '$panoksetYht']},
				saldo: {$subtract: ['$voitotYht', '$panoksetYht']}
			}
		}).exec(cb);
};

var Veto = mongoose.model('Veto', VetoSchema);

module.exports = Veto;