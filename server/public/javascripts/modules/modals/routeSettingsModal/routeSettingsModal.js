angular.module('AsifHayir')
	.directive('routeSettingsModal', ['VolunteersService', '$http', function(VolunteersService, $http) {
	  return {
	  	restrict: 'E',
		templateUrl: "/javascripts/modules/modals/routeSettingsModal/routeSettingsModal.html",
	    link: function(scope, element, attrs) {

			scope.saveSettings = function () {

				if (scope.validateSettings()) {

					// Set the new settings
					scope.route = scope.routeCopy;

					$http.put(`/updateRoute/${scope.route._id}`, scope.route).then(function(res) {
						// Close the modal
						$("#routeSettingsModal").modal("hide");
					});
				}
			}

			// Validate that the driver and his helper are not the same man
			scope.validateSettings = function () {

				var bIsValid = true;
				$("form select").removeClass("invalid-input");

				scope.routeCopy.paths.forEach((path, i) => {					
					if (angular.isDefined(path.driver) && angular.isDefined(path.helper) &&
						path.driver == path.helper) {
						bIsValid = false;
						$("form select:eq(" + i*2 + ")").addClass("invalid-input");
						$("form select:eq(" + (i*2 + 1) + ")").addClass("invalid-input");
					}
				});

				scope.routeSettingsForm.$setValidity("settings", bIsValid);
				return bIsValid;
			}

			scope.volunteerLabel = function (v) {
				return v.firstName + " " + v.lastName;
			}

			scope.loadVolunteers = function () {
				if (!scope.volunteers) {
					VolunteersService.getVolunteers().then(function (data) {
						// TODO
						scope.volunteers = [
							{
								_id: 1,
								identity: 362236985,
								firstName: "גל",
								lastName: "דרורי",
								address: "השיטה 34 אורנית",
								phone: "052-5310385"                
							},
							{
								_id: 2,
								identity: 362236985,
								firstName: "מאי",
								lastName: "דרורי",
								address: "השיטה 34 אורנית",
								phone: "052-5310385"                
							},
							{
								_id: 3,
								identity: 362236985,
								firstName: "עדי",
								lastName: "דרורי",
								address: "השיטה 34 אורנית",
								phone: "052-5310385"                
							},
							{
								_id: 4,
								identity: 362236985,
								firstName: "איריס",
								lastName: "דרורי",
								address: "השיטה 34 אורנית",
								phone: "052-5310385"                
							}
						];
					});
				}
			}

			scope.loadVolunteers();

			// Create a copy of the route because we don't want to bind
			// the new settings until the user click "save"
			$("#routeSettingsModal").on("show.bs.modal", function () {
				scope.$apply(function () {
					scope.routeCopy = angular.copy(scope.route);
				})				
			});
        }
    }
}]);