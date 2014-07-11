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
		.when('/lisaa', {
			templateUrl: 'partials/lisaa.html',
			controller: 'LomakeController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);