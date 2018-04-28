angular.module('AsifHayir')
	.directive('routeInfo', ['VolunteersService', 'DonationsService', function(VolunteersService, DonationsService) {
	  return {
	  	restrict: 'E',
	  	scope: {
			route: '='
	    },
		templateUrl: "/javascripts/modules/routes/table/routeInfo.html",
	    link: function(scope, element, attrs) {
			
			scope.loadDonations = function () {

				var donationsIds = [];
				scope.route.paths.forEach(path => {
					donationsIds = donationsIds.concat(Object.keys(path.donations));
				})

				DonationsService.getDonationsByIds(donationsIds).then(function (res) {
					scope.routeDonations = res.data;

					scope.onChangePath(0);
				});
			}

			scope.getDonationsForPath = function (pathIndex) {

				var pathDonations = [];
				var pathDonationsIds = scope.route.paths[pathIndex].donations;

				scope.routeDonations.forEach(routeDonation => {
					// Check if the current route donation belong to this path
					if (pathDonationsIds[routeDonation._id]) {
						var productsIds = pathDonationsIds[routeDonation._id];
						pathDonations = pathDonations.concat(DonationsService.flatDonationWithProducts(routeDonation, productsIds));
					}
				})

				return pathDonations;
			}

			scope.onChangePath = function (pathIndex) {
				scope.currentTabIndex = pathIndex;
							
				scope.donations = scope.getDonationsForPath(pathIndex);
				// DonationsService.getDonationsByIds(scope.route.paths[pathIndex].donations).then(function (res) {
				// 	scope.donations = res.data;
				// }); 
			}

			scope.getVolunteerName = function(id) {

				if (!id) return "טרם נבחר";
				
				if (scope.volunteers) {
					// Find the volunteer by its id
					var volunteer = scope.volunteers.find((v) => v._id == id);
					return (volunteer.firstName + " " + volunteer.lastName);
				}
			}

			scope.loadVolunteers = function () {
				if (!scope.volunteers) {
					VolunteersService.getVolunteers().then(function (data) {
						scope.volunteers = data;
					});
				}
			}

			scope.loadDonations();
			scope.loadVolunteers();
		}
	}
}]);