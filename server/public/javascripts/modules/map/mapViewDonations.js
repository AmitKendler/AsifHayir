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
			
				// var locations = [
				// 	['Bondi Beach', 31.95906228990288,34.77139596361667, 4],
				// 	['Coogee Beach', 32.013013644060564,34.7459377348423, 5],
				// 	['Cronulla Beach', 32.017962429354704,34.79571953415871, 3],
				// 	['Manly Beach', 32.02785919257162,34.862667471170425, 2],
				// 	['Maroubra Beach', 31.8862807237229,34.787438213825226, 1],
				// 	['Bondi Beach', 32.95906228990288,34.77139596361667, 4],
				// 	['Coogee Beach', 33.013013644060564,34.7459377348423, 5],
				// 	['Cronulla Beach', 30.017962429354704,34.79571953415871, 3],
				// 	['Manly Beach', 30.02785919257162,34.862667471170425, 2],
				// 	['Maroubra Beach', 33.8862807237229,34.787438213825226, 1]
				// ];
		
				// directionsService.route({
				// 	origin: new google.maps.LatLng(locations[1][1], locations[1][2]),
				// 	destination: new google.maps.LatLng(locations[2][1], locations[2][2]),
				// 	waypoints: [{
				// 		location:  new google.maps.LatLng(locations[3][1], locations[3][2]),
				// 		stopover: true
				// 	},
				// 	{
				// 		location:  new google.maps.LatLng(locations[4][1], locations[4][2]),
				// 		stopover: true
				// 	}],
				// 	optimizeWaypoints: true,
				// 	travelMode: 'DRIVING'
				// 	}, function(response, status) {
				// 	if (status === 'OK') {
				// 		directionsDisplay.setDirections(response);
				// 	} else {
				// 		window.alert('Directions request failed due to ' + status);
				// 	}
				// 	});

				function calculateAndDisplayRoute(directionsService, directionsDisplay) {

				}
			}
		}
}]);