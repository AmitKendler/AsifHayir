angular.module('AsifHayir')
	.directive('vehiclesTable', ['$compile', function($compile) {
	  return {
	  	restrict: 'E',
	  	// scope: {
		// 	vehicles: '='
	    // },
		templateUrl: "/javascripts/modules/vehicles/table/vehiclesTable.html",
	    link: function(scope, element, attrs) {
		}
	}
}]);
