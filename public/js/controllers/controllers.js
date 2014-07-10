
// VetoController
betBuddy.controller('VetoController', ['$scope', 'VetoFactory', function($scope, VetoFactory) {
		
		$scope.vedot = [];
		
		// Hakee kaikki vedot
		VetoFactory.haeVedot()
			.success(function(data) {
				$scope.vedot = data;
			});

		// Vedon tallennus
		$scope.tallenna = function() {
			$scope.vedot.push({pelimuoto: 'Pitkäveto'});
			console.log('Veto tallennettu!');
		};

		// Vedon muokkaus
		$scope.muokkaa = function(veto) {
			veto.pelimuoto = 'Muokattu pelimuoto';
			console.log('Vetoa muokattu!');
		};

 }]);


// KohdeController
betBuddy.controller('KohdeController', ['$scope', '$routeParams', 'VetoFactory', function($scope, $routeParams, VetoFactory) {
	
	$scope.veto = {};

	VetoFactory.haeVeto($routeParams.vetoId)
		.success(function(data) {
			$scope.veto = data;
		});
}]);

// TilastoController
betBuddy.controller('TilastoController',['$scope', 'VetoFactory', function($scope, VetoFactory) {
	$scope.tilastot = [];
	VetoFactory.haeTilastot()
			.success(function(data) {
				$scope.tilastot = data;
			});
}]);

// TallennaController
betBuddy.controller('TallennaController', ['$scope', 'VetoFactory', function($scope, VetoFactory) {
	$scope.tallennetteva = 'testi';

	$scope.tallenna = function(veto) {
		VetoFactory.tallenna(veto);
	};
}]);