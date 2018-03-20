angular.module('AsifHayir')
	.directive('planRouteModal', ['DonationsService', '$http', function(DonationsService, $http) {
	  return {
	  	restrict: 'E',
		templateUrl: "/javascripts/modules/modals/planRouteModal/planRouteModal.html",
	    link: function(scope, element, attrs) {

            scope.getLatLng = function (donation) {
                var loc = donation.address.location.coordinates;
                return new google.maps.LatLng(loc[0], loc[1]);
            }

            scope.planRoute = function (date, vehiclesAmount) {

                // TODO - get by date and 'include in algo'
                var routeDonations = scope.donations;
                var donationsIds = routeDonations.map(r => r._id);

                var directionsService = new google.maps.DirectionsService;

                var wayPoints = [];
                for (var i = 1; i < routeDonations.length - 1; i++) {
                    wayPoints.push({
                        location: scope.getLatLng(routeDonations[i]),
						stopover: true
                    })
                }

				directionsService.route({
					origin: scope.getLatLng(routeDonations[0]),
					destination: scope.getLatLng(routeDonations[routeDonations.length - 1]),
					waypoints: wayPoints,
					optimizeWaypoints: true,
					travelMode: 'DRIVING'
					}, function(response, status) {
					if (status === 'OK') {

                        scope.route = {
                            date: date,
                            paths: [
                                {
                                   geocoded_waypoints: response.geocoded_waypoints,
                                   routes: response.routes,
                                   request: response.request,
                                   // TODO
                                   donations: donationsIds
                                }
                            ],
                        }

                        $http.post('/addRoute', scope.route).then(function (res) {
                            
                             scope.route = res.data;

                            $("#planRouteModal").modal("hide");
                            $('#routeIsReadyModal').modal('show');   
                        });
                                 
					} else {
						window.alert('Directions request failed due to ' + status);
					}
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