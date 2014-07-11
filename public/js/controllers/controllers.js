
// VetoController
betBuddy.controller('VetoController', ['$scope', '$location', 'VetoFactory', function($scope, $location, VetoFactory) {
		
		$scope.vedot = [];

		// Hakee kaikki vedot
		VetoFactory.haeVedot()
			.success(function(data) {
				$scope.vedot = data;
			});

		$scope.poista = function(id) {
			VetoFactory.poista(id)
				.success(function(data) {
					console.log(data);
				});
		};

 }]);

betBuddy.controller('LomakeController', ['$scope', '$location', 'VetoFactory', function($scope, $location, VetoFactory) {
	
	$scope.tallenna = function(tallennettava) {
		VetoFactory.tallenna(JSON.stringify(tallennettava))
		.success(function(data) {
			$location.path('/vedot');
		})
		.error(function(data, status) {
			console.log(data);
		});
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