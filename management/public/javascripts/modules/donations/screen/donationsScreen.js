angular.module("AsifHayir").controller("donations", function ($scope, DonationsService) {
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

    DonationsService.getDonations().then(function (data) {
        $scope.donations = data;
    });   
});