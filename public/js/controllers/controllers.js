var betBuddy = angular.module('betBuddy', ['ngRoute']);

betBuddy.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/vedot', {
			templateUrl: 'partials/vedot.html',
			controller: 'VetoController'
		})
		.when('/vedot/:vetoId', {
			templateUrl: 'partials/kohteet.html',
			controller: 'KohdeController'
		})
		.when('/tilastot', {
			templateUrl: 'partials/tilastot.html',
			controller: 'TilastoController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

betBuddy.controller('VetoController', ['$scope', 'VetoFactory', function($scope, VetoFactory) {
		$scope.vedot = [];
		VetoFactory.haeVedot()
			.success(function(data) {
				$scope.vedot = data;
			});
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