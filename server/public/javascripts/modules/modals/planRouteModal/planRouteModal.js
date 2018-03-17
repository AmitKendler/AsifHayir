angular.module('AsifHayir')
	.directive('planRouteModal', ['DonationsService', function(DonationsService) {
	  return {
	  	restrict: 'E',
		templateUrl: "/javascripts/modules/modals/planRouteModal/planRouteModal.html",
	    link: function(scope, element, attrs) {

            scope.planRoute = function (date, vehiclesAmount) {

                DonationsService.planRoute(scope.getDonationsForAlgo(date.toLocaleDateString()), vehiclesAmount)
                    .then(function (response) {
                        scope.route = response;
            
                        $("#planRouteModal").modal("hide");
                        $('#routeIsReadyModal').modal('show');                            
                });
            }

            scope.getDonationsForAlgo = function (date) {
                // TODO
                return scope.donations.filter(function (currDonation) {
                    return currDonation.includeInAlgorithm && currDonation.date == date 
                })
            } 

            
		}
	}
}]);