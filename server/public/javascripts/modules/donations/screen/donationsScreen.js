angular.module("AsifHayir").controller("donations", function ($scope, DonationsService) {
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

    DonationsService.getDonations().then(function (res) {
        $scope.donations = [];

        res.data.forEach(givaway => {
            $scope.donations = $scope.donations.concat(DonationsService.flatDonationWithProducts(givaway));
        });
    });   
});