angular.module('AsifHayir')
	.directive('routeInfo', ['VolunteersService', 'DonationsService', '$http', 
	function(VolunteersService, DonationsService, $http) {
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
					VolunteersService.getVolunteers().then(function (res) {
						scope.volunteers = res.data;
					});
				}
			}

			scope.getAllProductsOfRoute = function () {
				var productsIds = [];
				scope.route.paths.forEach(path => {
					for (var key in path.donations) {
						productsIds = productsIds.concat(path.donations[key])
					}
				});

				return productsIds;
			}

			scope.startRoute = function () {

				var routeProductIds = scope.getAllProductsOfRoute();

				routeProductIds.forEach((productsId, index) => {

					$http.put(`/editProductInGiveaway/${productsId}`, {status: "PENDING"}).then(function(res) {

						// Check if this one is the last request
						if (index == routeProductIds.length - 1) {

							// Update route status
							scope.route.status = "STARTED";
							RoutesService.updateRouteStatus(scope.route).then(function(res) {
								scope.setUIRouteStatus(); 
							});
						}
					});
				});
			}

			scope.setUIRouteStatus = function () {
				var html = "צא לדרך";
				if (scope.route.status == "STARTED") {
					html = "יצאנו לדרך!";
					scope.startedRoute = true;
				}
				else if (scope.route.status == "FINISHED") {
					html = "המסלול הסתיים בהצלחה";
					scope.startedRoute = true;
				}
			}

			scope.setUIRouteStatus();
			scope.loadDonations();
			scope.loadVolunteers();
		}
	}
}]);