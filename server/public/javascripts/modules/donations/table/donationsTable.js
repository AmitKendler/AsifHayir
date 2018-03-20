angular.module('AsifHayir')
	.directive('donationsTable', ['$compile', function($compile) {
	  return {
	  	restrict: 'E',
	  	scope: {
			donations: '=',
			hideCheckboxes: '='
		},
		templateUrl: "/javascripts/modules/donations/table/donationsTable.html",
	    link: function(scope, element, attrs) {

			scope.columnWidth = scope.hideCheckboxes ? "14%" : "13%";

			scope.tableColumns = [
				{
					label: "סוג",
					getValue: function (row) { return scope.getTypeLabel(row.type); }
				},
				{
					label: "איש קשר",
					getValue: "contactName"
				},
				{
					label: "טלפון",
					getValue: "contactPhone"
				},
				{
					label: "תרומה",
					getValue: "title"
				},
				{
					label: "תיאור",
					getValue: "description"
				},
				{
					label: "כתובת לאיסוף",
					getValue: function (row) { return scope.getAddressLabel(row.address); }
				},
				{
					label: "זמין בשעות",
					getValue: function (row) { return scope.getTimeLabel(row.pickupTime); }
				}
			];

			scope.getValue = function (column, row) {
				return (typeof(column.getValue) == "string") ? row[column.getValue] : column.getValue(row);
			}

			scope.TYPE_ENUM = {
				0: "אוכל",
				1: "ביגוד",
				2: "ריהוט"
			};

			scope.STATUS_ENUM = {
				0: "חדש",
				1: "ממתין",
				2: "התקבל",
				3: "ממתין לאיסוף",
				4: "נשלח"
			};

			scope.getTypeLabel = function (type) {
				return scope.TYPE_ENUM[type];
			}

			scope.getStatusLabel = function (status) {
				return scope.STATUS_ENUM[status];
			}	
			
			scope.getAddressLabel = function (pickupAddress) {
				return pickupAddress.streetName + " " + pickupAddress.houseNumber + ", " + pickupAddress.city;
			}

			scope.getTimeLabel = function (pickupTime) {
				return (pickupTime.isAllDay) ? "כל היום" : (pickupTime.start + "-" + pickupTime.end);
			}
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

			scope.AMOUNT_TYPE_ENUM = {
				0: "פריטים",
				1: "ק''ג",
				2: "ליטר",
				3: "חלקים"
			};

			scope.getAmountTypeLabel = function (type) {
				return scope.AMOUNT_TYPE_ENUM[type];
			}

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
					case 0: return "foodPopover";
					case 1: return "clothingPopover";
					case 2: return "furniturePopover";
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