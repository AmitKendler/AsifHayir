angular.module("AsifHayir").controller("routes", function ($scope, RoutesService) {
    
    RoutesService.getRoutes().then(function (data) {        
        $scope.routes = data;

        $scope.route = $scope.routes[0];
        $scope.donations = [];
    });

    $scope.setRoute = function(routeIndex){
      $scope.route = $scope.routes[routeIndex];
    };

    $(".screen-content").css("marginRight", "130px");
    
    /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
    $scope.openNav = function () {
        $("#sidenavOpen").addClass("show");
        $("#sidenavClose").removeClass("show");
        $(".screen-content").css("marginRight", "130px");
    }

    /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
    $scope.closeNav = function () {
        $("#sidenavOpen").removeClass("show");
        $("#sidenavClose").addClass("show");
        $(".screen-content").css("marginRight", "50px");
    }    
});