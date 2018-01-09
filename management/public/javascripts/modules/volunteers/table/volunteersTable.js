angular.module('AsifHayir')
	.directive('volunteersTable', ['$compile', function($compile) {
	  return {
	  	restrict: 'E',
		templateUrl: "/javascripts/modules/volunteers/table/volunteersTable.html",
	    link: function(scope, element, attrs) {
		}
	}
}]);
