angular.module("AsifHayir").factory('VolunteersService', function($http) {
    return {
        getVolunteers: function() {
            // TODO
            return $http.get('https://jsonplaceholder.typicode.com/posts'); 
        }
    };
});

angular.module("AsifHayir").controller("volunteers", function ($scope, VolunteersService) {
    
    VolunteersService.getVolunteers().then(function (data) {
        
        // TODO
        $scope.volunteers = [
            {
                id: 362236985,
                firstName: "מאי",
                lastName: "דרורי",
                address: "השיטה 34 אורנית",
                phone: "052-5310385"                
            },
            {
                id: 362236985,
                firstName: "מאי",
                lastName: "דרורי",
                address: "השיטה 34 אורנית",
                phone: "052-5310385"                
            },
            {
                id: 362236985,
                firstName: "מאי",
                lastName: "דרורי",
                address: "השיטה 34 אורנית",
                phone: "052-5310385"                
            },
            {
                id: 362236985,
                firstName: "מאי",
                lastName: "דרורי",
                address: "השיטה 34 אורנית",
                phone: "052-5310385"                
            }
        ];

    });

    $scope.onOpenDialog = function (volunteer) {
        $scope.volunteer = angular.copy(volunteer);
    }

    $scope.addVolunteer = function() {

        // TODO: delete this and make sure the volunteer get the next seq from the server
        $scope.volunteer.id = 1;
        $scope.volunteers.push($scope.volunteers);

        // TODO call to server
    }

    $scope.updateVolunteer = function () {

        // Find the index of the volunteer we want to update
        var volunteerToUpdateIndex = $scope.volunteers.findIndex(volunteer => volunteer.id == $scope.volunteer.id);

        // Udate the volunteer
        $scope.volunteers[vehicleToUpdateIndex] = $scope.volunteer;
   
        // TODO call to server
    }

    $scope.deleteVolunteer = function (index) {

        $scope.volunteers.splice(index, 1);

        // TODO call to server
    }
    
});