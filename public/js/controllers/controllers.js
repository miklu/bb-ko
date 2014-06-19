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

		// Vedon poisto
		$scope.poista = function(veto) {
			$scope.vedot.splice($scope.vedot.indexOf(veto), 1);
			console.log('Veto poistettu: ' + veto);
		};

		// Vedon muokkaus
		$scope.muokkaa = function(veto) {
			veto.pelimuoto = 'Muokattu pelimuoto';
			console.log('Vetoa muokattu!');
		};

 }]);

betBuddy.controller('KohdeController', function($scope, $routeParams) {
	$scope.vetoId = $routeParams.vetoId;
});

betBuddy.controller('TilastoController',['$scope', 'VetoFactory', function($scope, VetoFactory) {
	$scope.tilastot = [];
	VetoFactory.haeTilastot()
			.success(function(data) {
				$scope.tilastot = data;
			});
}]);