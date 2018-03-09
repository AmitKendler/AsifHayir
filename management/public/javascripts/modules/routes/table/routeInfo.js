angular.module('AsifHayir')
	.directive('routeInfo', ['VolunteersService', function(VolunteersService) {
	  return {
	  	restrict: 'E',
	  	scope: {
			route: '='
	    },
		templateUrl: "/javascripts/modules/routes/table/routeInfo.html",
	    link: function(scope, element, attrs) {
			
			scope.onChangePath = function (pathIndex) {
				scope.currentTabIndex = pathIndex;

				// TODO
				if (pathIndex == 0) {
					scope.donations = [{
						_id: 1,
						donor: "שמנצלר",
						organization: "",
						description: "פיתות",
						type: "אוכל",
						address: "חנה סנש 15 הרצליה",
						date: "4.1.2018",
						fromHour: "08:00",
						toHour: "22:00",
						comments: "אחלה פיתות",
						status: "חדש",
						advanced: {
							isPacked: true,
							isHot: false,
							kosher: true,
							amount: 10
						}
					},
					{
						_id: 2,
						donor: "מאי דרורי",
						organization: "",
						description: "כל מיני בגדים",
						type: "ביגוד",
						address: "השיטה 34 אורנית",
						date: "8.1.2018",
						fromHour: "10:00",
						toHour: "20:00",
						comments: "נעלי בית",
						status: "ממתין לשיבוץ",
						advanced: {
							condition: "חדש",
							type: "נשים",
							amount: 3
						}
					}];
				}
				else {
					scope.donations = [{
						_id: 3,
						donor: "צופן מזרחי",
						organization: "",
						description: "שולחן כתיבה",
						type: "ריהוט",
						address: "בן גוריון 5 רמת גן",
						date: "7.1.2018",
						fromHour: "16:00",
						toHour: "20:00",
						comments: "אחלה שולחן",
						status: "ממתין לאיסוף",
						advanced: {
							condition: "בלוי"
						}
					},
					{
						_id: 3,
						donor: "צופן מזרחי",
						organization: "",
						description: "שולחן כתיבה",
						type: "ריהוט",
						address: "בן גוריון 5 רמת גן",
						date: "7.1.2018",
						fromHour: "16:00",
						toHour: "20:00",
						comments: "אחלה שולחן",
						status: "ממתין לאיסוף",
						advanced: {
							condition: "בלוי"
						}
					},
					{
						_id: 3,
						donor: "צופן מזרחי",
						organization: "",
						description: "שולחן כתיבה",
						type: "ריהוט",
						address: "בן גוריון 5 רמת גן",
						date: "9.1.2018",
						fromHour: "16:00",
						toHour: "20:00",
						comments: "אחלה שולחן",
						status: "ממתין לאיסוף",
						advanced: {
							condition: "בלוי"
						}
					},
					{
						_id: 3,
						donor: "צופן מזרחי",
						organization: "",
						description: "שולחן כתיבה",
						type: "ריהוט",
						address: "בן גוריון 5 רמת גן",
						date: "6.1.2018",
						fromHour: "16:00",
						toHour: "20:00",
						comments: "אחלה שולחן",
						status: "ממתין לאיסוף",
						advanced: {
							condition: "בלוי"
						}
					},
					{
						_id: 3,
						donor: "צופן מזרחי",
						organization: "",
						description: "שולחן כתיבה",
						type: "ריהוט",
						address: "בן גוריון 5 רמת גן",
						date: "8.1.2018",
						fromHour: "16:00",
						toHour: "20:00",
						comments: "אחלה שולחן",
						status: "ממתין לאיסוף",
						advanced: {
							condition: "בלוי"
						}
					}];
				}
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