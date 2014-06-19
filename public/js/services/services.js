betBuddy.factory('VetoFactory', ['$http', function($http) {
	
	var factory = {};

	factory.haeVedot = function() {
		return $http.get('http://localhost:3000/vedot');
	};

	factory.haeTilastot = function() {
		return $http.get('http://localhost:3000/tilastot');
	};

	return factory;

}]);