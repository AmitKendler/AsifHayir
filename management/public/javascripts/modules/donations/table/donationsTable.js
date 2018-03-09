angular.module('AsifHayir')
	.directive('donationsTable', ['$compile', function($compile) {
	  return {
	  	restrict: 'E',
	  	scope: {
			donations: '='
	    },
		templateUrl: "/javascripts/modules/donations/table/donationsTable.html",
	    link: function(scope, element, attrs) {
		}
	}
}]);

angular.module('AsifHayir').directive('popoverAdvancedDetails', function($compile){
	return {
		restrict: 'E',		  
		scope: {
			info: "=",
			type: "="
		},
		link: function(scope, element, attrs) {

			scope.definePopover = function () {

				var popoverId = scope.getPopoverIdByType();

				$(element).popover({
					title: "פרטים נוספים",
					trigger: "hover",
					container: 'body',
					html: true,
					placement: "right",
					content: $compile($("#" + popoverId).html())(scope)
				});	
			}

			scope.getPopoverIdByType = function () {

				switch (scope.type) {
					case "אוכל": return "foodPopover";
					case "ביגוד": return "clothingPopover";
					case "ריהוט": return "furniturePopover";
					default: return "";
				}
			}

			scope.getIconClass = function (key, valueForSuccess)	 {
				return (scope.info[key] == valueForSuccess) ? 'fa fa-check success-icon' : 'fa fa-times danger-icon';
			}

			scope.definePopover();
		}
	}
});