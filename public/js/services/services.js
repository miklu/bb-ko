betBuddy.factory('VetoFactory', ['$http', function($http) {
	
	var factory = {};

	factory.haeVedot = function() {
		return $http.get('http://localhost:3000/vedot');
	};

	factory.haeTilastot = function() {
		return $http.get('http://localhost:3000/tilastot');
	};

	factory.haeVeto = function(id) {
		return $http.get('http://localhost:3000/vedot/' + id);
	};

	factory.tallenna = function(veto) {
		return $http.post('http://localhost:3000/vedot', veto);
	};

	factory.poista = function(id) {
		return $http.delete('http://localhost:3000/vedot/' + id);
	}

	return factory;

}]);