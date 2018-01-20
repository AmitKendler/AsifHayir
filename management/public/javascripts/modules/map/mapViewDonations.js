angular.module('AsifHayir')
	.directive('mapViewDonations', ['$compile', function($compile) {
	  return {
	  	restrict: 'E',
	  	scope: {
	      donations: '='
	    },
			template: '<div id="map" class="container-fluid" style="height: ' + window.innerHeight*0.4 + 'px; margin:auto;"></div>',
	    link: function(scope, element, attrs) {

				var locations = [
					['Bondi Beach', 31.95906228990288,34.77139596361667, 4],
					['Coogee Beach', 32.013013644060564,34.7459377348423, 5],
					['Cronulla Beach', 32.017962429354704,34.79571953415871, 3],
					['Manly Beach', 32.02785919257162,34.862667471170425, 2],
					['Maroubra Beach', 31.8862807237229,34.787438213825226, 1]
				];
		
				var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 11,
					center: new google.maps.LatLng(31.95906228990288,34.77139596361667),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
		
				var infowindow = new google.maps.InfoWindow();
		
				var marker, i;
		
				for (i = 0; i < locations.length; i++) {  
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(locations[i][1], locations[i][2]),
						map: map
					});
		
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							infowindow.setContent(locations[i][0]);
							infowindow.open(map, marker);
						}
					})(marker, i));
				}
			}
		}
}]);