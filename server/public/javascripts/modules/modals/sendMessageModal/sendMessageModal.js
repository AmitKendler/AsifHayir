angular.module('AsifHayir')
	.directive('sendMessageModal', ['DonationsService', function(DonationsService) {
	  return {
	  	restrict: 'E',
        templateUrl: "/javascripts/modules/modals/sendMessageModal/sendMessageModal.html",
	    link: function(scope, element, attrs) {

			scope.sendMessage = function (message) {
                
            }
        }
    }
}]);