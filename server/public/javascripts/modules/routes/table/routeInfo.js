angular.module('AsifHayir')
	.directive('routeInfo', ['VolunteersService', 'DonationsService', function(VolunteersService, DonationsService) {
	  return {
	  	restrict: 'E',
	  	scope: {
			route: '='
	    },
		templateUrl: "/javascripts/modules/routes/table/routeInfo.html",
	    link: function(scope, element, attrs) {
			
			scope.onChangePath = function (pathIndex) {
				scope.currentTabIndex = pathIndex;
								
				DonationsService.getDonationsByIds(scope.route.paths[pathIndex].donations).then(function (data) {
					scope.donations = data;
				}); 
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

			scope.onChangePath(0);
			scope.loadVolunteers();
		}
	}
}]);