
// VetoController
betBuddy.controller('VetoController', ['$scope', '$location', 'VetoFactory', function($scope, $location, VetoFactory) {
		
		$scope.vedot = [];

		$scope.muokattava = '';
		$scope.tallennettava = '';
		
		// Hakee kaikki vedot
		VetoFactory.haeVedot()
			.success(function(data) {
				$scope.vedot = data;
			});

		// Vedon tallennus
		$scope.tallenna = function(tallennettava) {
			VetoFactory.tallenna({pelimuoto: tallennettava})
				.success(function(data) {
					$location.path('/vedot');
				})
				.error(function(data, status) {
					console.log(data);
				});
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