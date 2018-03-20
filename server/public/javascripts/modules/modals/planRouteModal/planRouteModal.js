angular.module('AsifHayir')
	.directive('planRouteModal', ['DonationsService', function(DonationsService) {
	  return {
	  	restrict: 'E',
		templateUrl: "/javascripts/modules/modals/planRouteModal/planRouteModal.html",
	    link: function(scope, element, attrs) {

            scope.getLatLng = function (donation) {
                var loc = donation.address.location.coordinates;
                return new google.maps.LatLng(loc[0], loc[1]);
            }

            scope.planRoute = function (date, vehiclesAmount) {

                var routeDonations = scope.getDonationsForAlgo(date.toLocaleDateString());

                var directionsService = new google.maps.DirectionsService;
				var directionsDisplay = new google.maps.DirectionsRenderer;
				// directionsDisplay.setMap(map);

                var wayPoints = [];
                for (var i = 1; i < routeDonations.length - 1; i++) {
                    wayPoints.push({
                        location: getLatLng(routeDonations[i]),
						stopover: true
                    })
                }

				directionsService.route({
					origin: getLatLng(routeDonations[0]),
					destination: getLatLng(routeDonations[routeDonations.length - 1]),
					waypoints: wayPoints,
					optimizeWaypoints: true,
					travelMode: 'DRIVING'
					}, function(response, status) {
					if (status === 'OK') {

                        var route = response;
                        route.date = date;

                        $http.post('/saveRoute', route).then(function (res) {
                            $scope.newRoute = res.data;        

                            $("#planRouteModal").modal("hide");
                            $('#routeIsReadyModal').modal('show');   
                        });

                        // directionsDisplay.setDirections(response);
                                 
					} else {
						window.alert('Directions request failed due to ' + status);
					}
                    });
                    
                // DonationsService.planRoute(scope.getDonationsForAlgo(date.toLocaleDateString()), vehiclesAmount)
                //     .then(function (response) {
                //         scope.route = response;
            
                //         $("#planRouteModal").modal("hide");
                //         $('#routeIsReadyModal').modal('show');                            
                // });
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