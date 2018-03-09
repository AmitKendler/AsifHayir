angular.module("AsifHayir").controller("vehicles", function ($scope, VehiclesService) {
    
    VehiclesService.getVehicles().then(function (data) {
        $scope.vehicles = data;        
    });

    $scope.onOpenDialog = function (vehicle) {
        $scope.vehicle = angular.copy(vehicle);
    }

    $scope.addVehicle = function() {

        // TODO: delete this 
        $scope.vehicle._id = 1;
        $scope.vehicles.push($scope.vehicle);

        // TODO remove from comment
        // VehiclesService.addVehicle($scope.vehicle).then(function () {
        //     VehiclesService.getVehicles().then(function (data) {
        //         $scope.vehicles = data;
        //     })
        // })
    }

    $scope.updateVehicle = function () {

        // Find the index of the vehicle we want to update
        var vehicleToUpdateIndex = $scope.vehicles.findIndex(vehicle => vehicle._id == $scope.vehicle._id);

        // Udate the vehicle
        VehiclesService.updateVehicle($scope.vehicle).then(function () {
            $scope.vehicles[vehicleToUpdateIndex] = $scope.vehicle;
        })
    }

    $scope.deleteVehicle = function (index) {
        VehiclesService.deleteVehicle($scope.vehicles[index]._id).then(function () {
            $scope.vehicles.splice(index, 1)
        })
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