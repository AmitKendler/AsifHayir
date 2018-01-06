angular.module("AsifHayir").factory('VehiclesService', function($http) {
    return {
        getVehicles: function() {
            // TODO
            return $http.get('https://jsonplaceholder.typicode.com/posts'); 
        }
    };
});

angular.module("AsifHayir").controller("vehicles", function ($scope, VehiclesService) {
    
    VehiclesService.getVehicles().then(function (data) {
        
        // TODO
        $scope.vehicles = [
            {
                id: 1,
                number: 7973155,
                type: "tender",
                capacity: 20,
                image: "https://www.cstatic-images.com/car-pictures/main/USC50FOT113A021001.png"
                
            },
            {
                id: 2,
                number: 3163258,
                type: "hyundai i20",
                capacity: 10,
                image: "http://www.kia.com/content/dam/kwcms/kme/uk/en/assets/static/gnb/kia-niro-512x288-11.png"
            },
            {
                id: 3,
                number: 9856896,
                type: "ford focus",
                capacity: 15,
                image: "https://www.fordeumedia-b.ford.com/nas/gforcenaslive/gbr/00l/yyh/images/gbr00lyyh1j52lp(a)(a)cozshowroom_0_0.png"
            },
            {
                id: 4,
                number: 9856896,
                type: "mazda 2",
                capacity: 15                
            },
            {
                id: 5,
                number: 7973155,
                type: "tender",
                capacity: 20,
                image: "https://www.mazda.co.nz/sites/default/files/MDZ3986_Mazda2_GLX_HATCH_Snowflake%20Pearl%20White%20Mica_Front_0.png"                          
            },
        ];

    });

    $scope.onOpenDialog = function (vehicle) {
        $scope.vehicle = angular.copy(vehicle);
    }

    $scope.addVehicle = function() {

        // TODO: delete this and make sure the vehicle get the next seq from the server
        $scope.vehicle.id = 1;
        $scope.vehicles.push($scope.vehicle);

        // TODO call to server
    }

    $scope.updateVehicle = function () {

        // Find the index of the vehicle we want to update
        var vehicleToUpdateIndex = $scope.vehicles.findIndex(vehicle => vehicle.id == $scope.vehicle.id);

        // Udate the vehicle
        $scope.vehicles[vehicleToUpdateIndex] = $scope.vehicle;
   
        // TODO call to server
    }

    $scope.deleteVehicle = function (index) {

        $scope.vehicles.splice(index, 1);

        // TODO call to server
    }

    $scope.formatCarNumber = function (number) {

        var str = number.toString();

        if (str.length == 7) {
            return str[0] + str[1] + "-" + str[2] + str[3] + str[4] + "-" + str[5] + str[6];
        }
        else if (str.length == 8) {
            return str[0] + str[1] + str[2] + "-" + str[3] + str[4] + "-" + str[5] + str[6] + str[7];
        }
    }
    
});