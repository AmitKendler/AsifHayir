angular.module('AsifHayir')
	.directive('mapViewDonations', ['$compile', function($compile) {
	  return {
	  	restrict: 'E',
	  	scope: {
		  donations: '=',
		  route: '='
	    },
			template: '<div id="map" class="container-fluid" style="height: ' + window.innerHeight*0.4 + 'px; margin:auto;"></div>',
	    link: function(scope, element, attrs) {

			scope.$on("setRouteInfo", function(event, route) {
				scope.route = route;
				scope.displayRoute();
			});

			scope.initMap = function () {

				scope.map = new google.maps.Map(document.getElementById('map'), {
					zoom: 11,
					center: new google.maps.LatLng(31.95906228990288,34.77139596361667),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
				});

				scope.setMarkers();

				if (scope.route) scope.displayRoute();
			}

			scope.getLatLng = function (donation) {
                var loc = donation.address.location.coordinates;
                return new google.maps.LatLng(loc[0], loc[1]);
			}
			
			scope.setMarkers = function () {

				var infowindow = new google.maps.InfoWindow();
		
				var marker, i;
				var markers=[];

				scope.donations.forEach(donation => {
				
					marker = new google.maps.Marker({
						position: scope.getLatLng(donation),
						map: scope.map
					});

					markers.push(marker);

					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							infowindow.setContent(donation.title);
							infowindow.open(scope.map, marker);
						}
					})(marker, i));
				});

				// Add a marker clusterer to manage the markers.
        		var markerCluster = new MarkerClusterer(scope.map, markers,
            	{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
				
			}

			scope.displayRoute = function (routeId) {

				var directionsDisplay = new google.maps.DirectionsRenderer;
				directionsDisplay.setMap(scope.map);

				directionsDisplay.setDirections(scope.route.paths[0]);
			}

			scope.initMap();
			}
		}
}]);